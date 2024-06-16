import type { Build, BuildChange, BuildArtifact } from './types';
import { DUMMY_BUILD } from './dummyData';
import type { Project } from '../project';
import moment from 'moment';

export * from './types';

const TEAMCITY_API_URL = 'https://ci.enginehub.org';
const TEAMCITY_DATE_FORMAT = 'YYYYMMDDTHHmmssZ';

const CHANGE_FIELDS = `changes(change(version,username,comment,date))`;
const ARTIFACT_FIELDS = `artifacts(file(name,size))`;

interface TCBuild {
    build: {
        id: string;
        status: 'SUCCESS' | 'FAILED';
        changes: {
            change: BuildChange[];
        };
        artifacts: {
            file: BuildArtifact[];
        };
        statusText: string;
        branchName: string;
        finishDate: string;
        number: string;
        buildType: {
            projectId: string;
        };
    }[];
}

async function getBuildFromTCSelector(
    selector: string
): Promise<Build | undefined> {
    const url = `${TEAMCITY_API_URL}/guestAuth/app/rest/latest/builds/?locator=${selector}&fields=build(id,status,statusText,branchName,finishDate,number,buildType(projectId),${CHANGE_FIELDS},${ARTIFACT_FIELDS})`;

    const data = (await fetch(url, {
        headers: {
            Accept: 'application/json'
        }
    }).then(response => response.json())) as TCBuild;

    const build = data.build[0];

    if (build === undefined) {
        return undefined;
    }

    return {
        build_id: build.id,
        state: build.status,
        changes: build.changes.change,
        artifacts: build.artifacts.file,
        statusText: build.statusText,
        branch: build.branchName,
        build_date: moment(build.finishDate, TEAMCITY_DATE_FORMAT).valueOf(),
        build_hash: build.number.split('-')[1],
        build_number: parseInt(build.number.split('-')[0]),
        project: build.buildType.projectId.toLowerCase()
    };
}

export async function getBuild(buildId: string): Promise<Build | undefined> {
    if (process.env.NODE_ENV !== 'production' && buildId === 'test') {
        return await Promise.resolve(DUMMY_BUILD(buildId));
    }

    return await getBuildFromTCSelector(`id:${buildId}`);
}

export async function getLatestBuild(
    project: Project,
    branch?: string
): Promise<Build | undefined> {
    return await getBuildFromTCSelector(
        `branch:${branch ? branch : project.defaultBranch},buildType:${
            project.buildType
        },status:SUCCESS`
    );
}

export const BUILDS_PER_PAGE = 10;

export async function getBuildPage(
    project: Project,
    branch: string,
    pageNumber: number
): Promise<Build[]> {
    if (pageNumber < 0) {
        return [];
    }

    const url = `${TEAMCITY_API_URL}/guestAuth/app/rest/latest/builds?locator=buildType:${
        project.buildType
    },branch:${branch},count:${BUILDS_PER_PAGE + 1},start:${
        pageNumber * BUILDS_PER_PAGE
    }&fields=build(number,status,id,statusText,finishDate,${CHANGE_FIELDS})`;
    const data = (await fetch(url, {
        headers: {
            Accept: 'application/json'
        }
    }).then(response => response.json())) as TCBuild;

    return data.build.map(build => ({
        state: build.status,
        branch: branch,
        build_id: build.id,
        build_hash: build.number.split('-')[1],
        build_number: parseInt(build.number.split('-')[0]),
        statusText: build.statusText,
        build_date: moment(build.finishDate, TEAMCITY_DATE_FORMAT).valueOf(),
        changes: build.changes.change.flatMap(change => {
            const changes = change.comment.trim().split('\n*');
            return changes
                .map(c => c.trim())
                .filter(c => c.length > 0)
                .map(c => ({
                    ...change,
                    comment: c
                }));
        }),
        artifacts: [],
        project: project.id
    }));
}

interface TCBranch {
    branch: {
        name: string;
    }[];
}

export async function getBranches(project: Project): Promise<string[]> {
    const url = `${TEAMCITY_API_URL}/guestAuth/app/rest/latest/projects/${project.id}/branches`;
    const data = (await fetch(url, {
        headers: {
            Accept: 'application/json'
        }
    }).then(response => response.json())) as TCBranch;
    const branches = data.branch.map(branch => branch.name);
    if (project.pinnedBranches) {
        for (const pinnedBranch of project.pinnedBranches) {
            if (!branches.includes(pinnedBranch)) {
                branches.push(pinnedBranch);
            }
        }
    }

    return branches
        .filter(branch => !branch.startsWith('refs/heads/'))
        .map(branch => {
            if (branch === '<default>') {
                return project.defaultBranch;
            }
            return branch;
        });
}

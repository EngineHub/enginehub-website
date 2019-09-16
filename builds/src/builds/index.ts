import { Build, BuildChange } from './types';
import axios from 'axios';
import { DUMMY_BUILD } from './dummyData';
import { Project } from '@builds/project';
import moment from 'moment';

export * from './types';

const TEAMCITY_API_URL = 'https://ci.enginehub.org';
const TEAMCITY_DATE_FORMAT = 'YYYYMMDDTHHmmssZ';

async function getChanges(buildId: string): Promise<BuildChange[]> {
    const { data } = await axios.get(`${TEAMCITY_API_URL}/guestAuth/app/rest/changes?locator=build(id:${buildId})&fields=change(version,username,comment,date)`);
    if (!data.change) {
        return [];
    }
    return data.change.map((change: any) => ({
        version: change.version,
        username: change.username,
        summary: change.comment,
        date: moment(change.date, TEAMCITY_DATE_FORMAT).valueOf()
    }));
}

async function getBuildFromTCSelector(selector: string): Promise<Build> {
    const url = `${TEAMCITY_API_URL}/guestAuth/app/rest/latest/builds/${selector}`;

    const { data } = await axios.get(url, {
        headers: {
            Accept: 'application/json'
        }
    });
    const artifacts = await axios.get(TEAMCITY_API_URL + data.artifacts.href);

    return {
        build_id: data.id,
        state: data.status,
        changes: await getChanges(data.id),
        artifacts: artifacts.data.file.map((artifact: any) => ({
            name: artifact.name,
            size: artifact.size
        })),
        statusText: data.statusText,
        branch: data.branchName,
        build_date: moment(data.finishDate, TEAMCITY_DATE_FORMAT).valueOf(),
        build_hash: data.number.split('-')[1],
        build_number: data.number.split('-')[0],
        project: data.buildType.projectId.toLowerCase()
    };
}

export async function getBuild(buildId: string): Promise<Build> {
    if (process.env.NODE_ENV !== 'production' && buildId === 'test') {
        return await Promise.resolve(DUMMY_BUILD(buildId));
    }

    return await getBuildFromTCSelector(`id:${buildId}`);
}

export async function getLatestBuild(
    project: Project,
    branch?: string
): Promise<Build> {
    if (branch && branch.includes('/')) {
        branch = undefined; // TODO Find a workaround for this Tomcat bug
    }
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
    },branch:${branch},count:${BUILDS_PER_PAGE + 1},start:${pageNumber *
        BUILDS_PER_PAGE}&fields=build(number,status,id,statusText,finishDate,changes)`;
    const { data } = await axios.get(url, {
        headers: {
            Accept: 'application/json'
        }
    });

    await Promise.all(
        data.build.map(async (build: any) => {
            build.changeData = await getChanges(build.id);
        })
    );

    return data.build.map((build: any) => ({
        state: build.status,
        branch: branch,
        build_id: build.id,
        build_hash: build.number.split('-')[1],
        build_number: build.number.split('-')[0],
        statusText: build.statusText,
        build_date: moment(build.finishDate, TEAMCITY_DATE_FORMAT).valueOf(),
        changes: build.changeData
    }));
}

export async function getBranches(project: Project): Promise<string[]> {
    const url = `${TEAMCITY_API_URL}/guestAuth/app/rest/latest/projects/${project.id}/branches`;
    const { data } = await axios.get(url, {
        headers: {
            Accept: 'application/json'
        }
    });
    const branches = data.branch.map((branch: any) =>
        branch.default ? project.defaultBranch : branch.name
    );
    if (project.pinnedBranches) {
        for (const pinnedBranch of project.pinnedBranches) {
            if (!branches.includes(pinnedBranch)) {
                branches.push(pinnedBranch);
            }
        }
    }

    return branches;
}

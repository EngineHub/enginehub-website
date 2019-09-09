import { Build, BuildChange } from './types';
import axios from 'axios';
import { DUMMY_BUILD } from './dummyData';
import { Project } from '@builds/project';
import moment from 'moment';

export * from './types';

const TEAMCITY_API_URL = 'https://ci.enginehub.org';
const TEAMCITY_DATE_FORMAT = 'YYYYMMDDTHHmmssZ';

async function getChanges(changesHref: string): Promise<BuildChange[]> {
    const { data } = await axios.get(TEAMCITY_API_URL + changesHref);
    if (!data.change) {
        return [];
    }
    const changeSummaries = (await Promise.all(
        data.change.map((change: any) =>
            axios.get(TEAMCITY_API_URL + change.href)
        )
    )).map((c: any) => c.data);

    return changeSummaries.map((change: any) => ({
        version: change.version,
        username: change.username,
        summary: change.comment,
        date: moment(change.date, TEAMCITY_DATE_FORMAT).valueOf()
    }));
}

async function getBuildFromTCSelector(selector: string): Promise<Build> {
    const url = `${TEAMCITY_API_URL}/guestAuth/app/rest/builds/${selector}`;

    const { data } = await axios.get(url);
    const artifacts = await axios.get(TEAMCITY_API_URL + data.artifacts.href);

    return {
        build_id: data.id,
        state: data.status,
        changes: await getChanges(data.changes.href),
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

    const url = `${TEAMCITY_API_URL}/guestAuth/app/rest/builds?locator=buildType:${
        project.buildType
    },branch:${branch},count:${BUILDS_PER_PAGE + 1},start:${pageNumber *
        BUILDS_PER_PAGE}&fields=build(number,status,id,statusText,finishDate,changes)`;
    const { data } = await axios.get(url);

    await Promise.all(data.build.map(async (build: any) => {
        build.changeData = await getChanges(build.changes.href);
    }));

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
    const url = `${TEAMCITY_API_URL}/guestAuth/app/rest/projects/${project.id}/branches`;
    const { data } = await axios.get(url);
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

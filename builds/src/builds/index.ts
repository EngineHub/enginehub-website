import { Build } from './types';
import axios from 'axios';
import { DUMMY_BUILD } from './dummyData';
import { Project } from '@builds/project';

export * from './types';

const TEAMCITY_API_URL = 'https://ci.enginehub.org';

async function getBuildFromTCSelector(selector: string): Promise<Build> {
    const url = `${TEAMCITY_API_URL}/guestAuth/app/rest/builds/${selector}`;

    const { data } = await axios.get(url);
    const [changes, artifacts] = await Promise.all([
        axios.get(TEAMCITY_API_URL + data.changes.href),
        axios.get(TEAMCITY_API_URL + data.artifacts.href)
    ]);

    const changeSummaries = (await Promise.all(
        changes.data.change.map((change: any) =>
            axios.get(TEAMCITY_API_URL + change.href)
        )
    )).map((c: any) => c.data);

    return {
        build_id: data.id,
        state: data.status,
        changes: changeSummaries.map((change: any) => ({
            version: change.version,
            username: change.username,
            summary: change.comment,
            date: Date.now()
        })),
        artifacts: artifacts.data.file.map((artifact: any) => ({
            name: artifact.name,
            size: artifact.size
        })),
        statusText: data.statusText,
        branch: data.branchName,
        build_date: Date.now(),
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

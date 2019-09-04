import { Build } from './types';
import axios from 'axios';

export * from './types';

const TEAMCITY_API_URL = 'https://ci.enginehub.org';

export async function getBuild(buildId: string): Promise<Build> {
    if (process.env.NODE_ENV !== 'production' && buildId === 'test') {
        return await Promise.resolve({
            build_id: buildId,
            build_number: 10,
            build_hash: 'abababa',
            build_date: Date.now(),
            project: 'worldedit',
            state: 'SUCCESS',
            branch: 'master',
            statusText: 'Yeah this passed',
            changes: [
                {
                    version: 'abababa',
                    username: 'testerson',
                    summary: 'Made some test changes',
                    date: Date.now()
                },
                {
                    version: 'abababa',
                    username: 'testerson',
                    summary: 'Made some test changes',
                    date: Date.now()
                }
            ],
            artifacts: [
                {
                    name: 'test-jar-dist.jar',
                    size: 1024 * 2348
                },
                {
                    name: 'test-jar-dev.jar',
                    size: 1024 * 8402.4
                },
                {
                    name: 'test-jar-cake.jar',
                    size: 1024 * 23
                },
                {
                    name: 'test-jar-sources.jar',
                    size: 1024 * 1231
                }
            ]
        });
    }

    const url = `${TEAMCITY_API_URL}/guestAuth/app/rest/builds/id:${buildId}`;

    const { data } = await axios.get(url);
    const [changes, artifacts] = await Promise.all([
        axios.get(TEAMCITY_API_URL + data.changes.href),
        axios.get(TEAMCITY_API_URL + data.artifacts.href)
    ]);

    const changeSummaries = (await Promise.all(changes.data.change.map((change: any) => axios.get(TEAMCITY_API_URL + change.href)))).map((c: any) => c.data);

    return {
        build_id: buildId,
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
        project: 'worldedit'
    };
}

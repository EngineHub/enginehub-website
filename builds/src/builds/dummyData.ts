import type { Build } from './types';

export const DUMMY_BUILD: (buildId: string) => Build = (buildId: string) => ({
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
            comment: 'Made some test changes',
            date: Date.now()
        },
        {
            version: 'abababa',
            username: 'testerson',
            comment: 'Made some test changes',
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

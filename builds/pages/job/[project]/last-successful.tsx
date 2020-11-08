import { getLatestBuild } from '@builds/builds';
import { PROJECT_MAP } from '@builds/project';
import { NextPageContext } from 'next';

const LastSuccessful = () => <div>placeholder</div>;

export async function getServerSideProps({ query, res }: NextPageContext) {
    const { project, branch } = query;
    const projectObj = PROJECT_MAP.get(project as string);
    if (!projectObj) {
        res?.writeHead(301, {
            Location: '/404'
        });
        res?.end();
        return;
    }
    const buildObj = await getLatestBuild(projectObj, branch as string);

    res?.writeHead(301, {
        Location: `/job/${project}/${buildObj?.build_id}`
    });
    res?.end();
}

export default LastSuccessful;

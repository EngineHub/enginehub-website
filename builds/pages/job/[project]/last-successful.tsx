import type { GetServerSideProps } from 'next';

import { getLatestBuild } from '../../../src/builds';
import { PROJECT_MAP } from '../../../src/project';

const LastSuccessful = () => <div>placeholder</div>;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { project, branch } = query;
    const projectObj = PROJECT_MAP.get(project as string);
    if (!projectObj) {
        return {
            notFound: true
        };
    }
    const buildObj = await getLatestBuild(projectObj, branch as string);
    if (!buildObj) {
        return {
            notFound: true
        };
    }

    return {
        redirect: {
            permanent: false,

            destination: `/job/${project}/${buildObj.build_id}`
        }
    };
};

export default LastSuccessful;

import { getLatestBuild } from '@builds/builds';
import { PROJECT_MAP } from '@builds/project';
import { GetServerSideProps } from 'next';

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

    return {
        redirect: {
            permanent: false,
            destination: `/job/${project}/${buildObj?.build_id}`
        }
    };
};

export default LastSuccessful;

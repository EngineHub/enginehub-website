import type { GetServerSideProps } from 'next';
import Link from 'next/link';

import { Container, MainLink, SEO, WarningBox } from '@enginehub/shared';

import { getLatestBuild } from '../../../src/builds';
import Layout from '../../../src/Layout';
import { PROJECT_MAP } from '../../../src/project';

interface LastSuccessfulProps {
    projectId: string;
}

const LastSuccessful = ({ projectId }: LastSuccessfulProps) => (
    <Layout>
        <SEO
            title="Last Successful Build"
            description="The last successful build is temporarily unavailable."
        />
        <div className={Container}>
            <div className={WarningBox} role="alert">
                Build data is temporarily unavailable. Please try again shortly.
            </div>
            <Link className={MainLink} href={`/job/${projectId}`}>
                View project builds
            </Link>
        </div>
    </Layout>
);

export const getServerSideProps: GetServerSideProps<
    LastSuccessfulProps
> = async ({ query }) => {
    const { project, branch } = query;
    const projectName = typeof project === 'string' ? project : undefined;
    const projectObj = projectName ? PROJECT_MAP.get(projectName) : undefined;
    if (!projectName || !projectObj) {
        return {
            notFound: true
        };
    }
    let buildObj;
    try {
        buildObj = await getLatestBuild(
            projectObj,
            typeof branch === 'string' ? branch : undefined
        );
    } catch (error) {
        console.error('Unable to load last successful build:', error);
        return {
            props: { projectId: projectName, buildsUnavailable: true }
        };
    }
    if (!buildObj) {
        return {
            notFound: true
        };
    }

    return {
        redirect: {
            permanent: false,

            destination: `/job/${projectName}/${buildObj.build_id}`
        }
    };
};

export default LastSuccessful;

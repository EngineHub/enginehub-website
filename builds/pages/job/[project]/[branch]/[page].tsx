import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PROJECT_MAP, Project } from '@builds/project';
import {
    Build,
    getBranches,
    getBuildPage,
    BUILDS_PER_PAGE
} from '@builds/builds';
import { ParsedUrlQuery } from 'querystring';
import Page from './index';

interface ProjectPageProps {
    activeBranch: string;
    project?: Project;
    builds: Build[];
    branches: string[];
    pageNumber: number;
    hasNextPage: boolean;
}

function Index({
    project,
    builds,
    branches,
    activeBranch,
    pageNumber,
    hasNextPage
}: ProjectPageProps) {
    return (
        <Page
            project={project}
            builds={builds}
            branches={branches}
            activeBranch={activeBranch}
            pageNumber={pageNumber}
            hasNextPage={hasNextPage}
        />
    );
}

interface ProjectStaticProps extends ParsedUrlQuery {
    project: string;
    branch: string;
    page: string;
}

export const getStaticProps: GetStaticProps<
    ProjectPageProps,
    ProjectStaticProps
> = async ({ params }) => {
    async function getProps() {
        const { project, branch, page } = params!;
        const projectObj = PROJECT_MAP.get(project);
        if (!projectObj) {
            return {
                project: undefined,
                builds: [],
                branches: [],
                activeBranch: '',
                pageNumber: 0,
                hasNextPage: false
            };
        }

        const pageNumber = parseInt(page) || 0;

        const [builds, branches] = await Promise.all([
            getBuildPage(projectObj, branch, pageNumber),
            getBranches(projectObj)
        ]);
        const hasNextPage = builds.length === BUILDS_PER_PAGE + 1;
        if (hasNextPage) {
            builds.pop();
        }

        return {
            project: projectObj,
            builds,
            branches,
            activeBranch: branch,
            pageNumber: pageNumber,
            hasNextPage
        };
    }

    return {
        props: await getProps(),
        revalidate: 60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true
    };
};

export default Index;

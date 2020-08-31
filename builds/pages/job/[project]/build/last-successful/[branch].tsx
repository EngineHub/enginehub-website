import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PROJECT_MAP, Project, PROJECTS } from '@builds/project';
import { Build, getBranches, getLatestBuild } from '@builds/builds';

import Page from '../[build]/index';
import { ParsedUrlQuery } from 'querystring';

interface BuildPageProps {
    build?: Build;
    project?: Project;
}

function Index({ project, build }: BuildPageProps) {
    return <Page project={project} build={build} />;
}

interface LastSuccessfulStaticProps extends ParsedUrlQuery {
    project?: string;
    branch?: string;
}

export const getStaticProps: GetStaticProps<
    BuildPageProps,
    LastSuccessfulStaticProps
> = async ({ params }) => {
    async function getProps() {
        const { project, branch } = params!;
        const projectObj = PROJECT_MAP.get(project as string);
        if (!projectObj) {
            return { project: projectObj };
        }
        let buildObj = undefined;
        try {
            buildObj = await getLatestBuild(projectObj, branch as string);
        } catch (e) {}
        return { project: projectObj, build: buildObj };
    }

    return {
        props: await getProps(),
        revalidate: 60
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [];

    for (const proj of PROJECTS) {
        const branches = await getBranches(proj);
        for (const branch of branches) {
            paths.push({ params: { project: proj.id, branch } });
        }
    }

    return {
        paths,
        fallback: true
    };
};

export default Index;

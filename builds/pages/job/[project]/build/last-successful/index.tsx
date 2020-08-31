import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PROJECT_MAP, Project, PROJECTS } from '@builds/project';
import { Build, getLatestBuild } from '@builds/builds';

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
}

export const getStaticProps: GetStaticProps<
    BuildPageProps,
    LastSuccessfulStaticProps
> = async ({ params }) => {
    async function getProps() {
        const { project } = params!;
        const projectObj = PROJECT_MAP.get(project as string);
        if (!projectObj) {
            return { project: projectObj };
        }
        let buildObj = undefined;
        try {
            buildObj = await getLatestBuild(projectObj, undefined);
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
        paths.push({ params: { project: proj.id } });
    }

    return {
        paths,
        fallback: false
    };
};

export default Index;

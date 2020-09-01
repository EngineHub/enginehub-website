import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { PROJECT_MAP, Project, PROJECTS } from '@builds/project';
import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MissingPage from '../../404';

interface ProjectRedirectProps {
    project?: Project;
}

function Index({ project }: ProjectRedirectProps) {
    const router = useRouter();
    
    useEffect(() => {
        if (!project) {
            router.push(`/404`);
        } else {
            const branch = `${router.query['branch'] ?? project.defaultBranch}`;
            const page = `${router.query['page'] ?? '0'}`;
            router.push(
                `/job/${project.id}/${encodeURIComponent(branch)}/${page}`
            );
        }
    });

    return <MissingPage />;
}

interface ProjectStaticProps extends ParsedUrlQuery {
    project: string;
}

export const getStaticProps: GetStaticProps<
    ProjectRedirectProps,
    ProjectStaticProps
> = async ({ params }) => {
    async function getProps() {
        const { project } = params!;
        const projectObj = PROJECT_MAP.get(project);
        if (!projectObj) {
            return {
                project: undefined
            };
        }

        return {
            project: projectObj
        };
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

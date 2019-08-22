import React from 'react';
import Layout from '@builds/layout';
import { Container } from '@shared/components/container';
import { WarningBox } from '@shared/components/WarningBox';
import SEO from '@shared/components/seo';
import { NextPageContext } from 'next-server/dist/lib/utils';
import { PageHeader } from '@shared/components/PageHeader';
import { PROJECT_MAP, Project } from '@builds/project';
import Error from '../../_error';

interface ProjectPageProps {
    project: Project;
}

function Index({ project }: ProjectPageProps) {
    if (!project) {
        return <Error statusCode={404} />;
    }
    return (
        <Layout extraSponsors={project.extraSponsors}>
            <SEO title={`${project.name} Builds`} />
            <PageHeader
                text={`${project.name} Builds`}
                showSponsors={false}
                icon={project.icon}
            />
            <Container>
                <WarningBox>
                    <b>
                        The {project.name} builds page is temporarily
                        unavailable due to a hardware failure! Please use
                        release builds from{' '}
                        <a href="https://enginehub.org/">here</a> for now, or{' '}
                        <a href="https://discord.gg/enginehub">
                            join the Discord
                        </a>{' '}
                        for dev builds.
                    </b>
                </WarningBox>
            </Container>
        </Layout>
    );
}

Index.getInitialProps = async ({ query }: NextPageContext) => {
    const { project } = query;
    const projectObj = PROJECT_MAP.get(project as string);
    if (!projectObj) {
        return {};
    }

    return { project: projectObj };
};

export default Index;

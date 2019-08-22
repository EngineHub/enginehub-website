import React from 'react';
import Layout from '@builds/layout';
import { Container, ContainerPadded } from '@shared/components/container';
import styled from '@emotion/styled';
import { WarningBox } from '@shared/components/WarningBox';
import { NextPageContext } from 'next-server/dist/lib/utils';
import SEO from '@shared/components/seo';

const Header = styled.div`
    border-bottom: 1px solid #eee;
    margin: 0 0 30px;
    padding: 20px;
    padding-top: 0;
`;

const HeaderText = styled.h1`
    font-size: 36px;
    font-weight: 500;
    line-height: 1.8;
    color: rgb(51,51,51);
    margin: 0;
    padding: 0;
`;

interface BuildPageProps {
    build: string;
    project: string;
}

function Index({ project, build }: BuildPageProps) {
    return (
        <Layout>
            <SEO title={`${project} Builds`} />
            <Header>
                <ContainerPadded>
                    <HeaderText>Builds</HeaderText>
                </ContainerPadded>
            </Header>
            <Container>
                <WarningBox>
                    <b>The builds page ({project} {build}) is temporarily unavailable due to a hardware failure! Please use release
                    builds from <a href="https://enginehub.org/">here</a> for
                    now, or <a href="https://discord.gg/enginehub">join the Discord</a> for dev builds.</b>
                </WarningBox>
            </Container>
        </Layout>
    );
}

Index.getInitialProps = async ({ query }: NextPageContext) => {
    const { project, build } = query;
    // TODO Validate
    return { project, build };
};

export default Index;

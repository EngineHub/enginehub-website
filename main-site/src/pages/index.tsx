import React from 'react';

import Layout from '../components/Layout';
import { SEO, Container, Row, ColumnHalf } from '@enginehub/shared';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import ProjectBox from '../components/ProjectBox';
import WorldEditIcon from '../images/projects/logo/worldedit-logo.svg';
import WorldGuardIcon from '../images/projects/logo/worldguard-logo.svg';
import CraftBookIcon from '../images/projects/logo/craftbook-logo.svg';
import CmdBookIcon from '../images/projects/logo/commandbook-logo.svg';
import CmdHelperIcon from '../images/projects/logo/commandhelper-logo.svg';

const HeadingContainer = styled.div`
    margin: 20px 0 60px;
    text-align: center;
`;

const FeatureHeading = styled.h2`
    padding: 8px 60px;
    border-bottom: 1px solid #d0d0d0;
    font-weight: 700;
    font-size: 21px;
    line-height: 1.8;
    display: inline-block;
    margin-top: 23px;
    margin-bottom: 11.5px;
`;

const ProjectList = styled.ul`
    padding-left: 0;
    list-style: none;
    margin-top: 0;
    margin-bottom: 11.5px;
`;

interface IndexPageData {
    file: {
        publicURL: string;
    };
}

const IndexPage = ({ data }: { data: IndexPageData }) => {
    return (
        <Layout landing={true}>
            <SEO
                title="Welcome"
                description="Open-source mods for and by the Minecraft community"
                image={data.file.publicURL}
            />
            <Container>
                <HeadingContainer>
                    <FeatureHeading>Our Projects</FeatureHeading>
                </HeadingContainer>
                <Row>
                    <ColumnHalf>
                        <ProjectList>
                            <ProjectBox
                                name="WorldEdit"
                                slug="worldedit"
                                icon={WorldEditIcon}
                                description="An in-game open source map editor for Bukkit, Forge, and more with support for other mods."
                            />
                            <ProjectBox
                                name="WorldGuard"
                                slug="worldguard"
                                icon={WorldGuardIcon}
                                description="Guard areas of the world against troublemakers and tweak Minecraft's features to your delight."
                            />
                            <ProjectBox
                                name="CommandBook"
                                slug="commandbook"
                                icon={CmdBookIcon}
                                description="Basic and essential commands for your Bukkit server in a lightweight plugin."
                            />
                        </ProjectList>
                    </ColumnHalf>
                    <ColumnHalf>
                        <ProjectList>
                            <ProjectBox
                                name="CraftBook"
                                slug="craftbook"
                                icon={CraftBookIcon}
                                description="Magical drawbridges, functional elevators, compact logic gates, and more — all without a client mod!"
                            />
                            <ProjectBox
                                name="CommandHelper"
                                slug="commandhelper"
                                icon={CmdHelperIcon}
                                description="Script your Bukkit server without any Java knowledge using a easy to use and powerful language."
                            />
                        </ProjectList>
                    </ColumnHalf>
                </Row>
            </Container>
        </Layout>
    );
};

export default IndexPage;

export const query = graphql`
    query {
        file(name: { eq: "enginehub-logo" }) {
            publicURL
        }
    }
`;

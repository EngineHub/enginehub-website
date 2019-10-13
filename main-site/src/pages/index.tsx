import React from 'react';

import Layout from '@main/components/Layout';
import SEO from '@shared/components/Seo';
import styled from '@emotion/styled';
import { Container } from '@shared/components/Container';
import { Row, ColumnHalf } from '@shared/components/grid';
import { graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import ProjectBox from '@main/components/ProjectBox';

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
        childImageSharp: {
            fixed: FixedObject;
        };
    };
    allFile: {
        nodes: {
            childImageSharp: {
                fixed: FixedObject;
            };
            name: string;
        }[];
    };
}

const IndexPage = ({ data }: { data: IndexPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, node.childImageSharp.fixed])
    );
    return (
        <Layout landing={true}>
            <SEO
                title="Welcome"
                description="Open-source mods for and by the Minecraft community"
                image={data.file.childImageSharp.fixed.src}
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
                                icon={logoMap.get('worldedit-icon')!}
                                description="An in-game open source map editor for Bukkit, Forge, and more with support for other mods."
                            />
                            <ProjectBox
                                name="WorldGuard"
                                slug="worldguard"
                                icon={logoMap.get('worldguard-icon')!}
                                description="Guard areas of the world against troublemakers and tweak Minecraft's features to your delight."
                            />
                            <ProjectBox
                                name="CommandBook"
                                slug="commandbook"
                                icon={logoMap.get('commandbook-icon')!}
                                description="Basic and essential commands for your Bukkit server in a lightweight plugin."
                            />
                        </ProjectList>
                    </ColumnHalf>
                    <ColumnHalf>
                        <ProjectList>
                            <ProjectBox
                                name="CraftBook"
                                slug="craftbook"
                                icon={logoMap.get('craftbook-icon')!}
                                description="Magical drawbridges, functional elevators, compact logic gates, and more — all without a client mod!"
                            />
                            <ProjectBox
                                name="CommandHelper"
                                slug="commandhelper"
                                icon={logoMap.get('commandhelper-icon')!}
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
            childImageSharp {
                fixed(width: 100, height: 100, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
            }
        }
        allFile(
            filter: {
                name: {
                    in: [
                        "worldedit-icon"
                        "worldguard-icon"
                        "craftbook-icon"
                        "commandbook-icon"
                        "commandhelper-icon"
                    ]
                }
            }
        ) {
            nodes {
                childImageSharp {
                    fixed(width: 80, height: 80, quality: 100) {
                        ...GatsbyImageSharpFixed_withWebp_tracedSVG
                    }
                }
                name
            }
        }
    }
`;

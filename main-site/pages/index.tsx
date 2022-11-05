import Layout from '../src/components/Layout';
import { SEO, Container, Row, ColumnHalf } from '@enginehub/shared';
import styled from 'styled-components';
import ProjectBox from '../src/components/ProjectBox';
import worldEditIcon from '../src/images/projects/logo/worldedit-logo.svg';
import worldGuardIcon from '../src/images/projects/logo/worldguard-logo.svg';
import craftBookIcon from '../src/images/projects/logo/craftbook-logo.svg';
import cmdBookIcon from '../src/images/projects/logo/commandbook-logo.svg';
import cmdHelperIcon from '../src/images/projects/logo/commandhelper-logo.svg';

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

const IndexPage = () => {
    return (
        <Layout landing={true}>
            <SEO
                title="Welcome"
                description="Open-source mods for and by the Minecraft community"
                image={'/images/enginehub-logo.png'}
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
                                icon={worldEditIcon}
                                description="An in-game open source map editor for Bukkit, Forge, and more with support for other mods."
                            />
                            <ProjectBox
                                name="WorldGuard"
                                slug="worldguard"
                                icon={worldGuardIcon}
                                description="Guard areas of the world against troublemakers and tweak Minecraft's features to your delight."
                            />
                            <ProjectBox
                                name="CommandBook"
                                slug="commandbook"
                                icon={cmdBookIcon}
                                description="Basic and essential commands for your Bukkit server in a lightweight plugin."
                            />
                        </ProjectList>
                    </ColumnHalf>
                    <ColumnHalf>
                        <ProjectList>
                            <ProjectBox
                                name="CraftBook"
                                slug="craftbook"
                                icon={craftBookIcon}
                                description="Magical drawbridges, functional elevators, compact logic gates, and more — all without a client mod!"
                            />
                            <ProjectBox
                                name="CommandHelper"
                                slug="commandhelper"
                                icon={cmdHelperIcon}
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

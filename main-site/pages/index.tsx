import { ColumnHalf, Container, Row, SEO } from '@enginehub/shared';
import { getHomeStructuredData } from '@enginehub/shared/src/components/structured_data';

import {
    FeatureHeading,
    HeadingContainer,
    ProjectList
} from '../src/components/Landing.module.css';
import Layout from '../src/components/Layout';
import ProjectBox from '../src/components/ProjectBox';
import cmdBookIcon from '../src/images/projects/logo/commandbook-logo.svg';
import cmdHelperIcon from '../src/images/projects/logo/commandhelper-logo.svg';
import craftBookIcon from '../src/images/projects/logo/craftbook-logo.svg';
import worldEditIcon from '../src/images/projects/logo/worldedit-logo.svg';
import worldGuardIcon from '../src/images/projects/logo/worldguard-logo.svg';

const IndexPage = () => {
    return (
        <Layout landing={true}>
            <SEO
                title="Welcome"
                description="Open-source mods for and by the Minecraft community"
                image={'/images/enginehub-logo.png'}
                structuredData={getHomeStructuredData}
            />
            <div className={Container}>
                <div className={HeadingContainer}>
                    <h2 className={FeatureHeading}>Our Projects</h2>
                </div>
                <div className={Row}>
                    <div className={ColumnHalf}>
                        <ul className={ProjectList}>
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
                        </ul>
                    </div>
                    <div className={ColumnHalf}>
                        <ul className={ProjectList}>
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
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default IndexPage;

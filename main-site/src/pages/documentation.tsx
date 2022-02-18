import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import {
    SEO,
    ContainerPadded,
    Row,
    ColumnQuarter,
    ColumnThreeQuarter,
    SidebarHeading,
    SectionHeading
} from '@enginehub/shared';
import React from 'react';
import SidebarIcon from '../components/sidebar/SidebarIcon';
import { BlueOutboundButton, GrayOutboundButton } from '../components/Button';
import PlatformBanner from '../components/PlatformBanner';
import WorldEditHeader from '../images/projects/headers/worldedit-header.svg';
import WorldGuardHeader from '../images/projects/headers/worldguard-header.svg';
import CraftBookHeader from '../images/projects/headers/craftbook-header.svg';
import CmdBookHeader from '../images/projects/headers/commandbook-header.svg';
import CmdHelperHeader from '../images/projects/headers/commandhelper-header.svg';
import { getImage } from 'gatsby-plugin-image';
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';

interface DocumentationPageData {
    file: FileNode & { publicURL: string };
}

const DocumentationPage = ({ data }: { data: DocumentationPageData }) => {
    const iconImage = getImage(data.file);

    return (
        <Layout>
            <SEO
                title="Documentation"
                description="Documentation for the EngineHub projects. Home to the docs of WorldEdit, WorldGuard, CraftBook, CommandBook, CommandHelper, and more."
                image={data.file.publicURL}
            />
            <ContainerPadded>
                <Row>
                    <ColumnQuarter>
                        {iconImage && (
                            <SidebarIcon
                                image={iconImage}
                                alt={'EngineHub Logo'}
                            />
                        )}
                        <SidebarHeading>Docs</SidebarHeading>
                    </ColumnQuarter>
                    <ColumnThreeQuarter>
                        <SectionHeading id="documentation">
                            Documentation
                        </SectionHeading>
                        <p>Documentation for the following is available:</p>
                        <PlatformBanner img={WorldEditHeader} alt={'WorldEdit'}>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://worldedit.enginehub.org/en/latest/'
                                    }
                                >
                                    WorldEdit Docs
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-core/release/'
                                    }
                                >
                                    WorldEdit Core JavaDocs
                                </GrayOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-bukkit/release/'
                                    }
                                >
                                    WorldEdit Bukkit JavaDocs
                                </GrayOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-sponge/release/'
                                    }
                                >
                                    WorldEdit Sponge JavaDocs
                                </GrayOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-cli/release/'
                                    }
                                >
                                    WorldEdit CLI JavaDocs
                                </GrayOutboundButton>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            img={WorldGuardHeader}
                            alt={'WorldGuard'}
                        >
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://worldguard.enginehub.org/en/latest/'
                                    }
                                >
                                    WorldGuard Docs
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldguard/worldguard-core/release/'
                                    }
                                >
                                    WorldGuard Core JavaDocs
                                </GrayOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldguard/worldguard-bukkit/release/'
                                    }
                                >
                                    WorldGuard Bukkit JavaDocs
                                </GrayOutboundButton>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner img={CraftBookHeader} alt={'CraftBook'}>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://craftbook.enginehub.org/en/3.x/'
                                    }
                                >
                                    CraftBook 3 Docs (Spigot)
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://craftbook.enginehub.org/en/latest/'
                                    }
                                >
                                    CraftBook 4 Docs (Sponge)
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://craftbook.enginehub.org/en/5.0.0/'
                                    }
                                >
                                    CraftBook 5 Docs (Alpha - Spigot)
                                </BlueOutboundButton>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner img={CmdBookHeader} alt={'CommandBook'}>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'http://web.archive.org/web/20181222152247/http://wiki.sk89q.com/wiki/CommandBook'
                                    }
                                >
                                    CommandBook Docs
                                </BlueOutboundButton>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            img={CmdHelperHeader}
                            alt={'CommandHelper'}
                        >
                            <p>
                                <BlueOutboundButton
                                    href={'https://methodscript.com/docs/'}
                                >
                                    CommandHelper Docs
                                </BlueOutboundButton>
                            </p>
                        </PlatformBanner>
                    </ColumnThreeQuarter>
                </Row>
            </ContainerPadded>
        </Layout>
    );
};

export default DocumentationPage;

export const query = graphql`
    query {
        file(name: { eq: "enginehub-logo" }) {
            childImageSharp {
                gatsbyImageData(
                    width: 100
                    height: 100
                    quality: 100
                    layout: FIXED
                )
            }
            publicURL
        }
    }
`;

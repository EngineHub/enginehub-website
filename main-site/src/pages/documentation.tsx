import { graphql } from 'gatsby';
import Layout from '@main/components/Layout';
import SEO from '@shared/components/Seo';
import React from 'react';
import { ContainerPadded } from '@shared/components/Container';
import {
    Row,
    ColumnQuarter,
    ColumnThreeQuarter
} from '@shared/components/grid';
import { SidebarHeading } from '@shared/components/sidebar';
import { FixedObject } from 'gatsby-image';
import SidebarIcon from '@main/components/sidebar/SidebarIcon';
import { BlueOutboundButton, GrayOutboundButton } from '@main/components/Button';
import { SectionHeading } from '@shared/components/text/SectionHeading';
import PlatformBanner from '@main/components/PlatformBanner';
import WorldEditHeader from '../images/projects/headers/worldedit-header.svg';
import WorldGuardHeader from '../images/projects/headers/worldguard-header.svg';
import CraftBookHeader from '../images/projects/headers/craftbook-header.svg';
import CmdBookHeader from '../images/projects/headers/commandbook-header.svg';
import CmdHelperHeader from '../images/projects/headers/commandhelper-header.svg';

interface DocumentationPageData {
    file: {
        childImageSharp: {
            fixed: FixedObject;
        };
    };
}

const DocumentationPage = ({ data }: { data: DocumentationPageData }) => {
    return (
        <Layout>
            <SEO
                title="Documentation"
                description="Documentation for the EngineHub projects. Home to the docs of WorldEdit, WorldGuard, CraftBook, CommandBook, CommandHelper, and more."
                image={data.file.childImageSharp.fixed.src}
            />
            <ContainerPadded>
                <Row>
                    <ColumnQuarter>
                        <SidebarIcon
                            image={data.file.childImageSharp.fixed}
                            alt={'EngineHub Logo'}
                        />
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
                fixed(width: 100, height: 100, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
            }
        }
    }
`;

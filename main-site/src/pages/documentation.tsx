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
import { BlueOutboundButton } from '@main/components/Button';
import { SectionHeading } from '@shared/components/text/SectionHeading';
import PlatformBanner from '@main/components/PlatformBanner';

interface DocumentationPageData {
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

const DocumentationPage = ({ data }: { data: DocumentationPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, node.childImageSharp.fixed])
    );
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
                        <PlatformBanner
                            logo={logoMap.get('worldedit-icon')!}
                            alt={'WorldEdit'}
                        >
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://worldedit.enginehub.org/en/latest/'
                                    }
                                >
                                    WorldEdit Docs
                                </BlueOutboundButton>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            logo={logoMap.get('worldguard-icon')!}
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
                        </PlatformBanner>
                        <PlatformBanner
                            logo={logoMap.get('craftbook-icon')!}
                            alt={'CraftBook'}
                        >
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
                        </PlatformBanner>
                        <PlatformBanner
                            logo={logoMap.get('commandbook-icon')!}
                            alt={'CommandBook'}
                        >
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
                            logo={logoMap.get('commandhelper-icon')!}
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
                    fixed(width: 100, quality: 100) {
                        ...GatsbyImageSharpFixed_withWebp_tracedSVG
                    }
                }
                name
            }
        }
    }
`;

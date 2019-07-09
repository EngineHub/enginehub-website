import { graphql } from 'gatsby';
import Layout from '../components/layout.component';
import SEO from '../components/seo.component';
import React from 'react';
import { ContainerPadded } from '../components/container.component';
import Row from '@shared/components/grid/row.component';
import ColumnsQuarter, {
    ColumnsThreeQuarter
} from '@shared/components/grid/columns-4.component';
import SidebarHeading from '../components/sidebar/sidebar-heading.component';
import { FixedObject } from 'gatsby-image';
import SidebarIcon from '../components/sidebar/sidebar-icon.component';
import { BlueOutboundButton } from '../components/button.component';
import SectionHeading from '../components/section-heading.component';
import PlatformBanner from '../components/platform-banner.component';

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
                    <ColumnsQuarter>
                        <SidebarIcon
                            image={data.file.childImageSharp.fixed}
                            alt={'EngineHub Logo'}
                        />
                        <SidebarHeading>Docs</SidebarHeading>
                    </ColumnsQuarter>
                    <ColumnsThreeQuarter>
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
                                        'https://worldedit.readthedocs.io/en/latest/'
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
                                        'https://worldguard.readthedocs.io/en/latest/'
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
                                        'https://craftbook.readthedocs.io/en/3.x/'
                                    }
                                >
                                    CraftBook 3 Docs (Spigot)
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://craftbook.readthedocs.io/en/latest/'
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
                    </ColumnsThreeQuarter>
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
                    ...GatsbyImageSharpFixed_tracedSVG
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
                        ...GatsbyImageSharpFixed_tracedSVG
                    }
                }
                name
            }
        }
    }
`;

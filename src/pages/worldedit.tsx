import { graphql } from 'gatsby';
import Layout from '../components/layout.component';
import SEO from '../components/seo.component';
import React from 'react';
import { ContainerPadded } from '../components/container.component';
import Row from '../components/grid/row.component';
import ColumnsQuarter, {
    ColumnsThreeQuarter,
} from '../components/grid/columns-4.component';
import SidebarHeading from '../components/sidebar/sidebar-heading.component';
import { FixedObject } from 'gatsby-image';
import SidebarIcon from '../components/sidebar/sidebar-icon.component';
import {
    SidebarNavList,
    SidebarNavListItem,
} from '../components/sidebar/sidebar-nav.component';
import { MainOutboundLink } from '../components/link.component';
import SidebarDivider from '../components/sidebar/sidebar-divider.component';
import SubtleText from '../components/subtle-text.component';
import JumbotronContainer, {
    JumbotronText,
    JumbotronButtonBox,
} from '../components/jumbotron.component';
import SectionHeading from '../components/section-heading.component';

interface WorldEditPageData {
    allFile: {
        nodes: {
            childImageSharp: {
                fixed: FixedObject;
            };
            name: string;
        }[];
    };
}

const WorldEditPage = ({ data }: { data: WorldEditPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, node.childImageSharp.fixed])
    );
    return (
        <Layout>
            <SEO
                title="WorldEdit"
                description="WorldEdit is an open source in-game map editor available for Bukkit, Sponge, Forge, MinecraftEdu, and many other platforms."
            />
            <ContainerPadded>
                <Row>
                    <ColumnsQuarter>
                        <SidebarIcon
                            image={logoMap.get('worldedit-icon')!}
                            alt={'WorldEdit Logo'}
                        />
                        <SidebarHeading>WorldEdit</SidebarHeading>
                        <SidebarNavList>
                            <SidebarNavListItem>
                                Features (Anchor Point TODO)
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                Videos (Anchor Point TODO)
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                Downloads (Anchor Point TODO)
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://worldedit.rtfd.io">
                                    Documentation
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://discord.gg/enginehub">
                                    Discord
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://dev.enginehub.org/youtrack/issues/WORLDEDIT">
                                    Bug / Feature Tracker
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://github.com/EngineHub/WorldEdit">
                                    Source Code
                                </MainOutboundLink>
                            </SidebarNavListItem>
                        </SidebarNavList>
                        <SidebarDivider />
                        <SubtleText>
                            Project lead:{' '}
                            <MainOutboundLink href="https://twitter.com/the_me4502">
                                Me4502
                            </MainOutboundLink>
                        </SubtleText>
                        <iframe
                            src="https://ghbtns.com/github-btn.html?user=EngineHub&amp;repo=worldedit&amp;type=watch&amp;count=true"
                            allowTransparency={true}
                            frameBorder="0"
                            scrolling="0"
                            width="110"
                            height="20"
                        />
                    </ColumnsQuarter>
                    <ColumnsThreeQuarter>
                        <JumbotronContainer>
                            <JumbotronText>
                                WorldEdit is an open source in-game map editor
                                available for Bukkit, Forge, MinecraftEdu, and
                                many other platforms.
                            </JumbotronText>
                        </JumbotronContainer>
                        <SectionHeading>Features</SectionHeading>
                        <p>
                            WorldEdit lets you build <em>fast</em> and{' '}
                            <em>smart</em>. Why should you spend your time
                            building a wall or excavating a hole when you can
                            work on something <em>creative</em>?
                        </p>
                        <ul>
                            <li>
                                Create more impressive and much larger builds
                                with less time
                            </li>
                            <li>
                                Fix griefing and other issues without shutting
                                down your server
                            </li>
                            <li>
                                Quickly create, replace or delete thousands of
                                blocks in seconds
                            </li>
                            <li>
                                Level an entire mountain and replace it with
                                natural looking terrain
                            </li>
                            <li>
                                Use hand-bound tools and brushes to quickly
                                build mountains
                            </li>
                            <li>
                                Generate spheres, cylinders, cuboids, forests,
                                pumpkin patches, and snowy areas
                            </li>
                            <li>
                                Use your compass to quickly teleport to areas by
                                left clicking or using /jumpto
                            </li>
                            <li>
                                Choose an area and have it instantly restored
                                from backups
                            </li>
                            <li>
                                Copy areas, paste them, load them, and save them
                                as schematics
                            </li>
                            <li>
                                Evaluate mathematical expressions such as{' '}
                                <code>{`//g stone (0.75-sqrt(x^2+y^2))^2+z^2 < 0.25^2`}</code>
                            </li>
                            <li>Many more! There are over 100 functions.</li>
                        </ul>
                        <SectionHeading>Watch it in action</SectionHeading>
                        <iframe
                            width="100%"
                            height="410"
                            src="https://www.youtube.com/embed/72HlPD9CW10?theme=light&amp;rel=0"
                            frameBorder={0}
                            allowFullScreen={true}
                        />
                        <iframe
                            width="100%"
                            height="410"
                            src="https://www.youtube.com/embed/yl1hTctucOc?theme=light&amp;rel=0"
                            frameBorder={0}
                            allowFullScreen={true}
                        />
                        <SectionHeading>Downloads</SectionHeading>
                        <p>Please choose a download for your platform.</p>
                    </ColumnsThreeQuarter>
                </Row>
            </ContainerPadded>
        </Layout>
    );
};

export default WorldEditPage;

export const query = graphql`
    query {
        allFile(filter: { name: { in: ["worldedit-icon"] } }) {
            nodes {
                childImageSharp {
                    fixed(width: 100, height: 100, quality: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
                name
            }
        }
    }
`;

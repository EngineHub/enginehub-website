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
import { MainOutboundLink, MainLink } from '../components/link.component';
import SidebarDivider from '../components/sidebar/sidebar-divider.component';
import SubtleText from '../components/subtle-text.component';
import JumbotronContainer, {
    JumbotronText,
    JumbotronButtonBox,
} from '../components/jumbotron.component';
import SectionHeading from '../components/section-heading.component';
import GitHubButton from 'react-github-btn';
import PlatformBanner from '../components/platform-banner.component';
import { WarningLabel } from '../components/label.component';
import {
    GrayOutboundButton,
    BlueButton,
    BlueOutboundButton,
} from '../components/button.component';

interface WorldEditPageData {
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

const WorldEditPage = ({ data }: { data: WorldEditPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, node.childImageSharp.fixed])
    );
    return (
        <Layout>
            <SEO
                title="WorldEdit"
                description="WorldEdit is an open source in-game map editor available for Bukkit, Sponge, Forge, MinecraftEdu, and many other platforms."
                image={data.file.childImageSharp.fixed.src}
            />
            <ContainerPadded>
                <Row>
                    <ColumnsQuarter>
                        <SidebarIcon
                            image={data.file.childImageSharp.fixed}
                            alt={'WorldEdit Logo'}
                        />
                        <SidebarHeading>WorldEdit</SidebarHeading>
                        <SidebarNavList>
                            <SidebarNavListItem>
                                <MainLink to={'/worldedit/#features'}>
                                    Features
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainLink to={'/worldedit/#videos'}>
                                    Videos
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainLink to={'/worldedit/#downloads'}>
                                    Downloads
                                </MainLink>
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
                        <GitHubButton
                            href="https://github.com/EngineHub/worldedit"
                            data-icon="octicon-star"
                            data-show-count="true"
                            aria-label="Star EngineHub/worldedit on GitHub"
                        >
                            Star
                        </GitHubButton>
                    </ColumnsQuarter>
                    <ColumnsThreeQuarter>
                        <JumbotronContainer>
                            <JumbotronText>
                                WorldEdit is an open source in-game map editor
                                available for Bukkit, Forge, MinecraftEdu, and
                                many other platforms.
                            </JumbotronText>
                            <JumbotronButtonBox>
                                <BlueButton to={'/worldedit/#downloads'}>
                                    List downloads
                                </BlueButton>
                            </JumbotronButtonBox>
                        </JumbotronContainer>
                        <SectionHeading id="features">Features</SectionHeading>
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
                        <SectionHeading id="videos">
                            Watch it in action
                        </SectionHeading>
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
                        <SectionHeading id="downloads">
                            Downloads
                        </SectionHeading>
                        <p>Please choose a download for your platform.</p>
                        <PlatformBanner
                            logo={logoMap.get('bukkit-logo')!}
                            alt={'Bukkit'}
                        >
                            <p>We officially support WorldEdit for Bukkit.</p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'http://dev.bukkit.org/bukkit-plugins/worldedit/files/'
                                    }
                                >
                                    Latest release for Bukkit
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'https://builds.enginehub.org/job/worldedit'
                                    }
                                >
                                    Experimental builds for Bukkit
                                </GrayOutboundButton>
                            </p>
                            <ol>
                                <li>
                                    Find the <em>plugins</em> folder inside your
                                    Bukkit server's folder.
                                </li>
                                <li>
                                    Place the downloaded ".jar" file in your
                                    plugins folder.
                                </li>
                                <li>
                                    Start your server as you may have done
                                    before.
                                </li>
                                <li>
                                    Either configure your permissions plugin (if
                                    you are using one); otherwise, use{' '}
                                    <b>/op your_name</b> to make yourself a
                                    server operator.
                                </li>
                            </ol>
                        </PlatformBanner>
                        <PlatformBanner
                            logo={logoMap.get('forge-logo')!}
                            alt={'Minecraft Forge'}
                        >
                            <p>
                                We officially support WorldEdit for
                                MinecraftForge.
                            </p>
                            <GrayOutboundButton
                                href={
                                    'https://builds.enginehub.org/job/worldedit'
                                }
                            >
                                Experimental builds for MinecraftForge
                            </GrayOutboundButton>
                            <ol>
                                <li>
                                    Find the <em>mods</em> folder inside your
                                    Minecraft client/server's folder.
                                </li>
                                <li>
                                    Place the downloaded ".jar" file in your
                                    mods folder.
                                </li>
                                <li>
                                    Start your server or client as you may have
                                    done before.
                                </li>
                                <li>
                                    Either configure your permissions plugin (if
                                    you are using one); otherwise, use{' '}
                                    <b>/op your_name</b> to make yourself a
                                    server operator.
                                </li>
                            </ol>
                        </PlatformBanner>
                        <PlatformBanner
                            logo={logoMap.get('mcedu-logo')!}
                            alt={'MinecraftEdu'}
                        >
                            <p>
                                MinecraftEdu comes bundled with an (older)
                                version of WorldEdit. While we can assist with
                                usage of WorldEdit, we are unable to assist with
                                the update or installation of WorldEdit with
                                MinecraftEdu.
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            logo={logoMap.get('liteloader-logo')!}
                            alt={'LiteLoader'}
                        >
                            <p>
                                We do not officially support LiteLoader, but you
                                can download{' '}
                                <MainOutboundLink
                                    href={
                                        'http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/1294341-worldeditwrapper-use-worldedit-in-single-player'
                                    }
                                >
                                    an unofficial WorldEditWrapper
                                </MainOutboundLink>{' '}
                                that supports Minecraft 1.7.2.
                            </p>
                            <p>
                                <WarningLabel>Note!</WarningLabel> Some
                                features, such as setting biomes or copying and
                                pasting chests may not work with this version.
                            </p>
                        </PlatformBanner>
                    </ColumnsThreeQuarter>
                </Row>
            </ContainerPadded>
        </Layout>
    );
};

export default WorldEditPage;

export const query = graphql`
    query {
        file(name: { eq: "worldedit-icon" }) {
            childImageSharp {
                fixed(width: 100, height: 100, quality: 100) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        allFile(
            filter: {
                name: {
                    in: [
                        "bukkit-logo"
                        "forge-logo"
                        "mcedu-logo"
                        "liteloader-logo"
                        "canarymod-logo"
                    ]
                }
            }
        ) {
            nodes {
                childImageSharp {
                    fixed(width: 150, quality: 100) {
                        ...GatsbyImageSharpFixed
                    }
                }
                name
            }
        }
    }
`;

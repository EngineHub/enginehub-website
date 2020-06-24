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
import {
    SidebarDivider,
    SidebarNavList,
    SidebarNavListItem
} from '@shared/components/sidebar';
import { FixedObject } from 'gatsby-image';
import { MainOutboundLink, MainLink } from '@main/components/Link';
import { SubtleText } from '@shared/components/text/SubtleText';
import JumbotronContainer, {
    JumbotronText,
    JumbotronButtonBox,
    JumbotronImageBox
} from '@shared/components/Jumbotron';
import { SectionHeading } from '@shared/components/text/SectionHeading';
import GitHubButton from 'react-github-btn';
import PlatformBanner from '@main/components/PlatformBanner';
import {
    GrayOutboundButton,
    BlueButton,
    BlueOutboundButton
} from '@main/components/Button';
import { WarningLabel, InfoLabel } from '@shared/components/text/Label';
import { ReactComponent as HeaderLogo } from '../images/projects/headers/craftbook-header.svg';

interface CraftBookPageData {
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

const CraftBookPage = ({ data }: { data: CraftBookPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, node.childImageSharp.fixed])
    );
    return (
        <Layout extraSponsors={['beastnode']}>
            <SEO
                title="CraftBook"
                description="CraftBook lets you create magically extending bridges, compact Redstone circuits, complex Minecart mechanics, and much more — all without a client mod and fully customizable by the server."
                image={data.file.childImageSharp.fixed.src}
            />
            <ContainerPadded>
                <Row>
                    <JumbotronContainer>
                        <JumbotronImageBox>
                            <h1>
                                <HeaderLogo alt={'CraftBook'} loading={'eager'} />
                            </h1>
                        </JumbotronImageBox>
                        <JumbotronText>
                            CraftBook lets you create magically extending
                            bridges, compact Redstone circuits, complex Minecart
                            mechanics, and much more — all without a client mod
                            and fully customizable by the server.
                        </JumbotronText>
                        <JumbotronButtonBox>
                            <BlueButton to={'/craftbook/#downloads'}>
                                List downloads
                            </BlueButton>
                        </JumbotronButtonBox>
                    </JumbotronContainer>
                </Row>
                <Row>
                    <ColumnQuarter>
                        <SidebarNavList>
                            <SidebarNavListItem>
                                <MainLink to={'/craftbook/#features'}>
                                    Features
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainLink to={'/craftbook/#videos'}>
                                    Videos
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainLink to={'/craftbook/#downloads'}>
                                    Downloads
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainLink to="/documentation/">
                                    Documentation
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://discord.gg/enginehub">
                                    Discord
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://github.com/EngineHub/CraftBook/issues">
                                    Bug / Feature Tracker
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://github.com/EngineHub/CraftBook">
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
                            href="https://github.com/EngineHub/CraftBook"
                            data-icon="octicon-star"
                            data-show-count={true}
                            aria-label="Star EngineHub/CraftBook on GitHub"
                        >
                            Star
                        </GitHubButton>
                    </ColumnQuarter>
                    <ColumnThreeQuarter>
                        <SectionHeading
                            id="features"
                            style={{ marginTop: '0' }}
                        >
                            Features
                        </SectionHeading>
                        <ul>
                            <li>
                                Modular, and extremely light on your server.
                            </li>
                            <li>
                                Enable features that you need, disable ones that
                                you don't. Even tweak features to your liking.
                            </li>
                            <li>
                                Adds heaps of mechanics that allow you to mimic
                                large portions of FTB/Tekkit.
                            </li>
                            <li>
                                Redstone ICs (Logic gates, Sensors, Many others)
                            </li>
                            <li>
                                Elevators for your server so people can jump
                                between floors quickly.
                            </li>
                            <li>
                                Working cauldrons so players can cook inside
                                them.
                            </li>
                            <li>Your own custom crafting recipes.</li>
                            <li>Hidden switches for players.</li>
                            <li>Togglable areas and bridges.</li>
                            <li>Chairs you can sit on.</li>
                            <li>
                                Working pipes that can transfer items from place
                                to place.
                            </li>
                            <li>Footprints where your players walk.</li>
                            <li>Mobs and players drop their heads.</li>
                            <li>
                                The ability to bind commands to items, with
                                cool-downs, permissions and timers.
                            </li>
                            <li>And much more...</li>
                        </ul>
                        <p>
                            <InfoLabel>Did you know?</InfoLabel> CraftBook is
                            one of Minecraft's first mods/plugins.
                        </p>
                        <SectionHeading id="videos">
                            Watch it in action
                        </SectionHeading>
                        <iframe
                            width="100%"
                            height="410"
                            src="https://www.youtube.com/embed/nNb6jZYk55I?theme=light&amp;rel=0"
                            frameBorder={0}
                            allowFullScreen={true}
                        />
                        <iframe
                            width="100%"
                            height="410"
                            src="https://www.youtube.com/embed/OpKlSDPyR0M?theme=light&amp;rel=0"
                            frameBorder={0}
                            allowFullScreen={true}
                        />
                        <iframe
                            width="100%"
                            height="410"
                            src="https://www.youtube.com/embed/3l38t669ClA?theme=light&amp;rel=0"
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
                            <p>We officially support CraftBook for Bukkit.</p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'http://dev.bukkit.org/bukkit-plugins/craftbook/files/'
                                    }
                                >
                                    Stable builds for Bukkit
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'http://builds.enginehub.org/job/craftbook?branch=master'
                                    }
                                >
                                    Experimental builds for Bukkit
                                </GrayOutboundButton>
                            </p>
                            <p>
                                <WarningLabel>Note!</WarningLabel> CraftBook
                                requires that{' '}
                                <MainLink to={'/worldedit/'}>
                                    WorldEdit
                                </MainLink>{' '}
                                is installed.
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
                            logo={logoMap.get('spongepowered-logo')!}
                            alt={'SpongePowered'}
                        >
                            <p>We officially support CraftBook for Sponge.</p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://ore.spongepowered.org/EngineHub/CraftBook'
                                    }
                                >
                                    Stable builds for Sponge
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'http://builds.enginehub.org/job/craftbook?branch=4.x'
                                    }
                                >
                                    Experimental builds for Sponge
                                </GrayOutboundButton>
                            </p>
                            <p>
                                <WarningLabel>Note!</WarningLabel> CraftBook
                                requires that{' '}
                                <MainLink to={'/worldedit/'}>
                                    WorldEdit
                                </MainLink>{' '}
                                is installed.
                            </p>
                            <ol>
                                <li>
                                    Find the <em>mods</em> folder inside your
                                    Sponge server's folder.
                                </li>
                                <li>
                                    Place the downloaded ".jar" file in your
                                    mods folder.
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
                    </ColumnThreeQuarter>
                </Row>
            </ContainerPadded>
        </Layout>
    );
};

export default CraftBookPage;

export const query = graphql`
    query {
        file(name: { eq: "craftbook-icon" }) {
            childImageSharp {
                fixed(width: 100, height: 100, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
            }
        }
        allFile(
            filter: { name: { in: ["bukkit-logo", "spongepowered-logo"] } }
        ) {
            nodes {
                childImageSharp {
                    fixed(width: 150, quality: 100) {
                        ...GatsbyImageSharpFixed_withWebp_tracedSVG
                    }
                }
                name
            }
        }
    }
`;

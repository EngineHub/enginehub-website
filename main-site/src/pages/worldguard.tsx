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
import Img, { FixedObject, FluidObject } from 'gatsby-image';
import { MainOutboundLink, MainLink } from '@main/components/Link';
import { SubtleText } from '@shared/components/text/SubtleText';
import JumbotronContainer, {
    JumbotronText,
    JumbotronButtonBox,
    JumbotronImageBox
} from '@shared/components/Jumbotron';
import { SectionHeading } from '@shared/components/text/SectionHeading';
import GitHubButton from 'react-github-btn';
import PlatformBanner from '../components/PlatformBanner';
import {
    GrayOutboundButton,
    BlueButton,
    BlueOutboundButton
} from '@main/components/Button';
import { WarningLabel } from '@shared/components/text/Label';

interface WorldGuardPageData {
    file: {
        childImageSharp: {
            fixed: FixedObject;
        };
    };
    header: {
        childImageSharp: {
            fluid: FluidObject;
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

const WorldGuardPage = ({ data }: { data: WorldGuardPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, node.childImageSharp.fixed])
    );
    return (
        <Layout>
            <SEO
                title="WorldGuard"
                description="WorldGuard lets you and players guard areas of land against griefers and undesirables, as well as tweak and disable various gameplay features of Minecraft."
                image={data.file.childImageSharp.fixed.src}
            />
            <ContainerPadded>
                <Row>
                    <JumbotronContainer>
                        <JumbotronImageBox>
                            <h1>
                                <Img
                                    fluid={data.header.childImageSharp.fluid}
                                    alt={'WorldGuard'}
                                />
                            </h1>
                        </JumbotronImageBox>
                        <JumbotronText>
                            WorldGuard lets you and players guard areas of land
                            against griefers and undesirables, as well as tweak
                            and disable various gameplay features of Minecraft.
                        </JumbotronText>
                        <JumbotronButtonBox>
                            <BlueButton to={'/worldguard/#downloads'}>
                                List downloads
                            </BlueButton>
                        </JumbotronButtonBox>
                    </JumbotronContainer>
                </Row>
                <Row>
                    <ColumnQuarter>
                        <SidebarNavList>
                            <SidebarNavListItem>
                                <MainLink to={'/worldguard/#features'}>
                                    Features
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainLink to={'/worldguard/#videos'}>
                                    Videos
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainLink to={'/worldguard/#downloads'}>
                                    Downloads
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://worldguard.enginehub.org">
                                    Documentation
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://discord.gg/enginehub">
                                    Discord
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://github.com/EngineHub/WorldGuard/issues">
                                    Bug / Feature Tracker
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://github.com/EngineHub/WorldGuard">
                                    Source Code
                                </MainOutboundLink>
                            </SidebarNavListItem>
                        </SidebarNavList>
                        <SidebarDivider />
                        <SubtleText>Project lead: wizjany</SubtleText>
                        <GitHubButton
                            href="https://github.com/EngineHub/worldguard"
                            data-icon="octicon-star"
                            data-show-count={true}
                            aria-label="Star EngineHub/worldguard on GitHub"
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
                                Block creeper and wither block damage, falling
                                damage, etc.
                            </li>
                            <li>
                                Disable fire spread, lava fire spread, ice
                                formation, Endermen picking up blocks, etc.
                            </li>
                            <li>
                                Blacklist certain items and blocks so they can't
                                be used.
                            </li>
                            <li>
                                Warn moderators when certain items and blocks
                                are used.
                            </li>
                            <li>
                                Protect areas of your world so only certain
                                people can build in them.
                            </li>
                            <li>
                                Set areas where PVP, TNT, mob damage, and other
                                features are disabled.
                            </li>
                            <li>
                                Protect your server from various 'exploits' like
                                magical obsidian creation machines.
                            </li>
                            <li>
                                Disable, or enable, various Minecraft features,
                                like sponges from classic.
                            </li>
                            <li>
                                Add useful commands like an immediate "STOP ALL
                                FIRE SPREAD" command.
                            </li>
                            <li>
                                Enable only features you want! Everything is off
                                by default.
                            </li>
                        </ul>
                        <SectionHeading id="videos">
                            Watch it in action
                        </SectionHeading>
                        <iframe
                            width="100%"
                            height="410"
                            src="https://www.youtube.com/embed/2BaA6ma8L-E?theme=light&amp;rel=0"
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
                            <p>We officially support WorldGuard for Bukkit.</p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'http://dev.bukkit.org/bukkit-plugins/worldguard/files/'
                                    }
                                >
                                    Stable builds for Bukkit
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'http://builds.enginehub.org/job/worldguard'
                                    }
                                >
                                    Experimental builds for Bukkit
                                </GrayOutboundButton>
                            </p>
                            <p>
                                <WarningLabel>Note!</WarningLabel> WorldGuard
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
                    </ColumnThreeQuarter>
                </Row>
            </ContainerPadded>
        </Layout>
    );
};

export default WorldGuardPage;

export const query = graphql`
    query {
        file(name: { eq: "worldguard-icon" }) {
            childImageSharp {
                fixed(width: 100, height: 100, quality: 100) {
                    ...GatsbyImageSharpFixed_withWebp_tracedSVG
                }
            }
        }
        header: file(name: { eq: "worldguard-header" }) {
            childImageSharp {
                fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
            }
        }
        allFile(filter: { name: { in: ["bukkit-logo"] } }) {
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

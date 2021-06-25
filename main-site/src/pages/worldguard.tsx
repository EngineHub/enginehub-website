import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import {
    SEO,
    ContainerPadded,
    Row,
    ColumnHalf,
    JumbotronButtonBox,
    JumbotronContainer,
    JumbotronImageBox,
    JumbotronText,
    WarningLabel,
    HorizontalNav,
    HorizontalNavItem,
    AlignedContent,
    SectionHeading
} from '@enginehub/shared';
import React from 'react';
import { MainOutboundLink, MainLink } from '../components/Link';
import PlatformBanner from '../components/PlatformBanner';
import {
    GrayOutboundButton,
    BlueButton,
    BlueOutboundButton
} from '../components/Button';
import { ReactComponent as HeaderLogo } from '../images/projects/headers/worldguard-header.svg';
import { getImage } from 'gatsby-plugin-image';
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';

interface WorldGuardPageData {
    file: FileNode & { publicURL: string };
    allFile: { nodes: (FileNode & { name: string })[] };
}

const WorldGuardPage = ({ data }: { data: WorldGuardPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, getImage(node)])
    );
    return (
        <Layout>
            <SEO
                title="WorldGuard"
                description="WorldGuard lets you and players guard areas of land against griefers and undesirables, as well as tweak and disable various gameplay features of Minecraft."
                image={data.file.publicURL}
            />
            <ContainerPadded>
                <Row>
                    <JumbotronContainer>
                        <JumbotronImageBox>
                            <h1>
                                <HeaderLogo
                                    alt={'WorldGuard'}
                                    loading={'eager'}
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
                    <HorizontalNav>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://worldguard.enginehub.org">
                                Documentation
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem className={'hideSmall'}>
                            <MainOutboundLink href="https://discord.gg/enginehub">
                                Discord
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://github.com/EngineHub/WorldGuard/issues">
                                Bug / Feature Tracker
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://github.com/EngineHub/WorldGuard">
                                Source Code
                            </MainOutboundLink>
                        </HorizontalNavItem>
                    </HorizontalNav>
                </Row>
                <Row>
                    <AlignedContent
                        header={'Secure Your Server'}
                        align={'left'}
                        video={'/videos/worldguard_no_creeper_explode.mp4'}
                    >
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
                                Protect your server from various 'exploits' like
                                magical obsidian creation machines.
                            </li>
                            <li>
                                Add useful commands like an immediate "STOP ALL
                                FIRE SPREAD" command.
                            </li>
                        </ul>
                    </AlignedContent>
                </Row>
                <Row>
                    <AlignedContent
                        header={'Setup Protected Regions'}
                        align={'right'}
                        video={'/videos/worldguard_no_tnt.mp4'}
                    >
                        <li>
                            Protect areas of your world so only certain people
                            can build in them.
                        </li>
                        <li>
                            Set areas where PVP, TNT, mob damage, and other
                            features are disabled.
                        </li>
                        <li>
                            Create entry and exit messages for areas, or set
                            localized weather and time
                        </li>
                        <li>
                            Use an extensible flag system to fine-tune region
                            settings
                        </li>
                    </AlignedContent>
                </Row>
                <Row>
                    <AlignedContent
                        header={'Fully Customizable and Fast'}
                        align={'left'}
                        video={'/videos/worldguard_flags_menu.mp4'}
                    >
                        <li>
                            Disable, or enable, various Minecraft features, like
                            sponges from classic.
                        </li>
                        <li>
                            Enable only features you want! Everything is off by
                            default.
                        </li>
                        <li>
                            Disable, or enable, features of other supported
                            plugins that utilise our API.
                        </li>
                        <li>Have complete control over all protections.</li>
                        <li>High performance design to minimize TPS impact</li>
                    </AlignedContent>
                </Row>
                <Row>
                    <SectionHeading id="videos">
                        Watch it in action
                    </SectionHeading>
                </Row>
                <Row>
                    <ColumnHalf>
                        <iframe
                            width="100%"
                            height="410"
                            src="https://www.youtube.com/embed/2BaA6ma8L-E?theme=light&amp;rel=0"
                            frameBorder={0}
                            allowFullScreen={true}
                        />
                    </ColumnHalf>
                </Row>
                <Row>
                    <div>
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
                    </div>
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
                gatsbyImageData(
                    width: 512
                    height: 512
                    quality: 100
                    layout: FIXED
                )
            }
            publicURL
        }
        allFile(filter: { name: { in: ["bukkit-logo"] } }) {
            nodes {
                childImageSharp {
                    gatsbyImageData(width: 150, quality: 100, layout: FIXED)
                }
                name
            }
        }
    }
`;

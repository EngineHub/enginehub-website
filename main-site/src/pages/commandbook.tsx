import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import {
    SEO,
    ContainerPadded,
    Row,
    ColumnHalf,
    JumbotronText,
    JumbotronButtonBox,
    JumbotronImageBox,
    WarningLabel,
    HorizontalNav,
    HorizontalNavItem,
    AlignedContent,
    SectionHeading,
    InfoLabel,
    JumbotronContainer
} from '@enginehub/shared';
import React from 'react';
import { MainOutboundLink, MainLink } from '../components/Link';
import PlatformBanner from '../components/PlatformBanner';
import {
    GrayOutboundButton,
    BlueButton,
    BlueOutboundButton
} from '../components/Button';
import { ReactComponent as HeaderLogo } from '../images/projects/headers/commandbook-header.svg';
import { getImage } from 'gatsby-plugin-image';
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';

interface CommandBookPageData {
    file: FileNode & { publicURL: string };
    allFile: { nodes: (FileNode & { name: string })[] };
}

const CommandBookPage = ({ data }: { data: CommandBookPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, getImage(node)])
    );
    return (
        <Layout>
            <SEO
                title="CommandBook"
                description="CommandBook provides a long list of basic, 'default' commands for you and your players on any Bukkit server."
                image={data.file.publicURL}
            />
            <ContainerPadded>
                <Row>
                    <JumbotronContainer>
                        <JumbotronImageBox>
                            <h1>
                                <HeaderLogo
                                    alt={'CommandBook'}
                                    loading={'eager'}
                                />
                            </h1>
                        </JumbotronImageBox>
                        <JumbotronText>
                            CommandBook provides a long list of basic, "default"
                            commands for you and your players on any Bukkit
                            server.
                        </JumbotronText>
                        <JumbotronButtonBox>
                            <BlueButton to={'/commandbook/#downloads'}>
                                List downloads
                            </BlueButton>
                        </JumbotronButtonBox>
                    </JumbotronContainer>
                </Row>
                <Row>
                    <HorizontalNav>
                        <HorizontalNavItem>
                            <MainOutboundLink href="http://wiki.sk89q.com/wiki/commandbook">
                                Documentation
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem className={'hideSmall'}>
                            <MainOutboundLink href="https://discord.gg/enginehub">
                                Discord
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://github.com/EngineHub/CommandBook/issues">
                                Bug / Feature Tracker
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://github.com/EngineHub/CommandBook">
                                Source Code
                            </MainOutboundLink>
                        </HorizontalNavItem>
                    </HorizontalNav>
                </Row>
                <Row>
                    <AlignedContent header={'Features'} align={'left'}>
                        <ul>
                            <li>
                                Modular, and extremely light on your server.
                            </li>
                            <li>
                                Add multiple types of easy-to-use teleportation
                                commands.
                            </li>
                            <li>
                                Change time without having to remember the
                                numbers (/time 3am works)
                            </li>
                            <li>
                                Add support for homes and warps for your
                                players.
                            </li>
                            <li>Change weather with ease.</li>
                            <li>
                                Play with your players using commands like
                                /slap.
                            </li>
                            <li>Ban and kick users that are troublesome.</li>
                            <li>Do more! The list of features is below.</li>
                            <li>
                                Enable features that you need, disable ones that
                                you don't
                            </li>
                        </ul>
                        <p>
                            <InfoLabel>Did you know?</InfoLabel> CommandBook was
                            the first addon for Minecraft that let you enter
                            expressions (such as <code>#near</code>) and natural
                            language parameters ("3am" rather than "15450") for
                            commands.
                        </p>
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
                            src="https://www.youtube.com/embed/CFJ2D_Wpcxk?theme=light&amp;rel=0"
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
                            <p>We officially support CommandBook for Bukkit.</p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'http://dev.bukkit.org/bukkit-plugins/commandbook/files/'
                                    }
                                >
                                    Stable builds for Bukkit
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'http://builds.enginehub.org/job/commandbook'
                                    }
                                >
                                    Experimental builds for Bukkit
                                </GrayOutboundButton>
                            </p>
                            <p>
                                <WarningLabel>Note!</WarningLabel> CommandBook
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

export default CommandBookPage;

export const query = graphql`
    query {
        file(name: { eq: "commandbook-icon" }) {
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

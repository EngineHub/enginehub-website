import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import {
    SEO,
    ContainerPadded,
    Row,
    JumbotronText,
    JumbotronButtonBox,
    JumbotronImageBox,
    SectionHeading,
    InfoLabel,
    AlignedContent,
    HorizontalNav,
    HorizontalNavItem,
    JumbotronContainer
} from '@enginehub/shared';
import React from 'react';
import { MainOutboundLink } from '../components/Link';
import PlatformBanner from '../components/PlatformBanner';
import { BlueButton, BlueOutboundButton } from '../components/Button';
import { ReactComponent as HeaderLogo } from '../images/projects/headers/commandhelper-header.svg';
import { getImage } from 'gatsby-plugin-image';
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';

interface CommandHelperPageData {
    file: FileNode & { publicURL: string };
    allFile: { nodes: (FileNode & { name: string })[] };
}

const CommandHelperPage = ({ data }: { data: CommandHelperPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, getImage(node)])
    );
    return (
        <Layout discordOverride={'https://discord.gg/Z7jpHed'}>
            <SEO
                title="CommandHelper"
                description="CommandHelper lets you create easy-to-write and 'hot-reloadable' scripts for your Bukkit server to handle events and perform tasks — no Java knowledge required!"
                image={data.file.publicURL}
            />
            <ContainerPadded>
                <Row>
                    <JumbotronContainer>
                        <JumbotronImageBox>
                            <h1>
                                <HeaderLogo
                                    alt={'CommandHelper'}
                                    loading={'eager'}
                                />
                            </h1>
                        </JumbotronImageBox>
                        <JumbotronText>
                            CommandHelper lets you create easy-to-write and
                            "hot-reloadable" scripts for your Bukkit server to
                            handle events and perform tasks — no Java knowledge
                            required!
                        </JumbotronText>
                        <JumbotronButtonBox>
                            <BlueButton to={'/commandhelper/#downloads'}>
                                List downloads
                            </BlueButton>
                        </JumbotronButtonBox>
                    </JumbotronContainer>
                </Row>
                <Row>
                    <HorizontalNav>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://methodscript.com/docs/">
                                Documentation
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem className={'hideSmall'}>
                            <MainOutboundLink href="https://discord.gg/Z7jpHed">
                                Discord
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://github.com/EngineHub/CommandHelper/issues">
                                Bug / Feature Tracker
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://github.com/EngineHub/CommandHelper">
                                Source Code
                            </MainOutboundLink>
                        </HorizontalNavItem>
                    </HorizontalNav>
                </Row>
                <Row>
                    <AlignedContent header={'Features'} align={'left'}>
                        <ul>
                            <li>
                                Alias commands like /battle to run /warp
                                #battlearena.
                            </li>
                            <li>
                                Write a script to let players message each other
                                while offline.
                            </li>
                            <li>
                                Create an automated battle arena that
                                automatically resets.
                            </li>
                            <li>Write your own /tp, /time, or /warp</li>
                            <li>Interact with existing economy systems.</li>
                            <li>Integrate with another plugin's database</li>
                            <li>
                                Send emails to the administrator when a player
                                runs a command
                            </li>
                            <li>
                                Use WorldEdit or WorldGuard in your own scripts.
                            </li>
                            <li>
                                Do much more, from the simple to the complex,
                                with zero Java code.
                            </li>
                        </ul>
                    </AlignedContent>
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
                            <p>
                                We officially support CommandHelper for Bukkit.
                            </p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'http://builds.enginehub.org/job/commandhelper/'
                                    }
                                >
                                    Download builds for Bukkit
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <InfoLabel>Note!</InfoLabel> Stable builds are
                                no longer released — the builds above are built
                                from the latest code.
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

export default CommandHelperPage;

export const query = graphql`
    query {
        file(name: { eq: "commandhelper-icon" }) {
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

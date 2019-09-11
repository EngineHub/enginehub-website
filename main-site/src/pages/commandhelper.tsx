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
    SidebarHeading,
    SidebarDivider,
    SidebarNavList,
    SidebarNavListItem
} from '@shared/components/sidebar';
import { FixedObject } from 'gatsby-image';
import SidebarIcon from '@main/components/sidebar/SidebarIcon';
import { MainOutboundLink, MainLink } from '@main/components/Link';
import { SubtleText } from '@shared/components/text/SubtleText';
import JumbotronContainer, {
    JumbotronText,
    JumbotronButtonBox
} from '@shared/components/Jumbotron';
import { SectionHeading } from '@shared/components/text/SectionHeading';
import GitHubButton from 'react-github-btn';
import PlatformBanner from '@main/components/PlatformBanner';
import { BlueButton, BlueOutboundButton } from '@main/components/Button';
import { InfoLabel } from '@shared/components/text/Label';

interface CommandHelperPageData {
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

const CommandHelperPage = ({ data }: { data: CommandHelperPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, node.childImageSharp.fixed])
    );
    return (
        <Layout discordOverride={'https://discord.gg/Z7jpHed'}>
            <SEO
                title="CommandHelper"
                description="CommandHelper lets you create easy-to-write and 'hot-reloadable' scripts for your Bukkit server to handle events and perform tasks — no Java knowledge required!"
                image={data.file.childImageSharp.fixed.src}
            />
            <ContainerPadded>
                <Row>
                    <ColumnQuarter>
                        <SidebarIcon
                            image={data.file.childImageSharp.fixed}
                            alt={'CommandHelper Logo'}
                        />
                        <SidebarHeading>CmdHelper</SidebarHeading>
                        <SidebarNavList>
                            <SidebarNavListItem>
                                <MainLink to={'/commandhelper/#features'}>
                                    Features
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://methodscript.com/docs/3.3.4/Beginner's_Guide.html">
                                    Examples
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainLink to={'/commandhelper/#downloads'}>
                                    Downloads
                                </MainLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://methodscript.com/docs/">
                                    Documentation
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://discord.gg/Z7jpHed">
                                    Discord
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://dev.enginehub.org/youtrack/issues/CMDHELPER">
                                    Bug / Feature Tracker
                                </MainOutboundLink>
                            </SidebarNavListItem>
                            <SidebarNavListItem>
                                <MainOutboundLink href="https://github.com/EngineHub/CommandHelper">
                                    Source Code
                                </MainOutboundLink>
                            </SidebarNavListItem>
                        </SidebarNavList>
                        <SidebarDivider />
                        <SubtleText>
                            Project lead:{' '}
                            <MainOutboundLink href="http://forum.sk89q.com/members/ladycailin.270/">
                                LadyCailin
                            </MainOutboundLink>
                        </SubtleText>
                        <GitHubButton
                            href="https://github.com/EngineHub/commandhelper"
                            data-icon="octicon-star"
                            data-show-count={true}
                            aria-label="Star EngineHub/commandhelper on GitHub"
                        >
                            Star
                        </GitHubButton>
                    </ColumnQuarter>
                    <ColumnThreeQuarter>
                        <JumbotronContainer>
                            <JumbotronText>
                                CommandHelper lets you create easy-to-write and
                                "hot-reloadable" scripts for your Bukkit server
                                to handle events and perform tasks — no Java
                                knowledge required!
                            </JumbotronText>
                            <JumbotronButtonBox>
                                <BlueButton to={'/commandhelper/#downloads'}>
                                    List downloads
                                </BlueButton>
                            </JumbotronButtonBox>
                        </JumbotronContainer>
                        <SectionHeading id="features">Features</SectionHeading>
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
                    </ColumnThreeQuarter>
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
                fixed(width: 100, height: 100, quality: 100) {
                    ...GatsbyImageSharpFixed_tracedSVG
                }
            }
        }
        allFile(filter: { name: { in: ["bukkit-logo"] } }) {
            nodes {
                childImageSharp {
                    fixed(width: 150, quality: 100) {
                        ...GatsbyImageSharpFixed_tracedSVG
                    }
                }
                name
            }
        }
    }
`;

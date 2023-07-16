import Layout from '../src/components/Layout';
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
    JumbotronContainer,
    MainLink,
    GrayButton,
    Label,
    BlueButton,
    Container
} from '@enginehub/shared';
import PlatformBanner from '../src/components/PlatformBanner';
import commandBookHeader from '../src/images/projects/headers/commandbook-header.svg';
import bukkitLogo from '../src/images/platforms/bukkit-logo.png';
import commandBookLogo from '../src/images/projects/commandbook-icon.png';
import Image from 'next/image';

const CommandBookPage = () => {
    return (
        <Layout>
            <SEO
                title="CommandBook"
                description="CommandBook provides a long list of basic, 'default' commands for you and your players on any Bukkit server."
                image={commandBookLogo.src}
            />
            <div className={`${Container} ${ContainerPadded}`}>
                <div className={Row}>
                    <JumbotronContainer>
                        <JumbotronImageBox>
                            <h1>
                                <Image
                                    alt={'CommandBook'}
                                    src={commandBookHeader}
                                />
                            </h1>
                        </JumbotronImageBox>
                        <JumbotronText>
                            CommandBook provides a long list of basic, "default"
                            commands for you and your players on any Bukkit
                            server.
                        </JumbotronText>
                        <JumbotronButtonBox>
                            <BlueButton href="/commandbook/#downloads">
                                List downloads
                            </BlueButton>
                        </JumbotronButtonBox>
                    </JumbotronContainer>
                </div>
                <div className={Row}>
                    <HorizontalNav>
                        <HorizontalNavItem>
                            <MainLink href="http://wiki.sk89q.com/wiki/commandbook">
                                Documentation
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem className={'hideSmall'}>
                            <MainLink href="https://discord.gg/enginehub">
                                Discord
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainLink href="https://github.com/EngineHub/CommandBook/issues">
                                Bug / Feature Tracker
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainLink href="https://github.com/EngineHub/CommandBook">
                                Source Code
                            </MainLink>
                        </HorizontalNavItem>
                    </HorizontalNav>
                </div>
                <div className={Row}>
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
                            <span className={`${Label} ${InfoLabel}`}>
                                Did you know?
                            </span>{' '}
                            CommandBook was the first addon for Minecraft that
                            let you enter expressions (such as{' '}
                            <code>#near</code>) and natural language parameters
                            ("3am" rather than "15450") for commands.
                        </p>
                    </AlignedContent>
                </div>
                <div className={Row}>
                    <h3 className={SectionHeading} id="videos">
                        Watch it in action
                    </h3>
                </div>
                <div className={Row}>
                    <div className={ColumnHalf}>
                        <iframe
                            width="100%"
                            height="410"
                            src="https://www.youtube.com/embed/CFJ2D_Wpcxk?theme=light&amp;rel=0"
                            frameBorder={0}
                            allowFullScreen={true}
                        />
                    </div>
                </div>
                <div className={Row}>
                    <div>
                        <h3 className={SectionHeading} id="downloads">
                            Downloads
                        </h3>
                        <p>Please choose a download for your platform.</p>
                        <PlatformBanner img={bukkitLogo} alt={'Bukkit'}>
                            <p>We officially support CommandBook for Bukkit.</p>
                            <p>
                                <BlueButton
                                    href={
                                        'http://dev.bukkit.org/bukkit-plugins/commandbook/files/'
                                    }
                                >
                                    Stable builds for Bukkit
                                </BlueButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'http://builds.enginehub.org/job/commandbook'
                                    }
                                >
                                    Experimental builds for Bukkit
                                </GrayButton>
                            </p>
                            <p>
                                <span className={`${Label} ${WarningLabel}`}>
                                    Note!
                                </span>{' '}
                                CommandBook requires that{' '}
                                <MainLink href="/worldedit/">
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
                </div>
            </div>
        </Layout>
    );
};

export default CommandBookPage;

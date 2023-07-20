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
    Label,
    Container,
    Button,
    SecondaryButton,
    PrimaryButton
} from '@enginehub/shared';
import PlatformBanner from '../src/components/PlatformBanner';
import commandBookHeader from '../src/images/projects/headers/commandbook-header.svg';
import bukkitLogo from '../src/images/platforms/bukkit-logo.png';
import commandBookLogo from '../src/images/projects/commandbook-icon.png';
import Image from 'next/image';
import Link from 'next/link';

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
                    <div className={JumbotronContainer}>
                        <div className={JumbotronImageBox}>
                            <h1>
                                <Image
                                    alt={'CommandBook'}
                                    src={commandBookHeader}
                                />
                            </h1>
                        </div>
                        <h2 className={JumbotronText}>
                            CommandBook provides a long list of basic, "default"
                            commands for you and your players on any Bukkit
                            server.
                        </h2>
                        <div className={JumbotronButtonBox}>
                            <Link
                                className={`${Button} ${PrimaryButton}`}
                                href="/commandbook/#downloads"
                            >
                                List downloads
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={Row}>
                    <ul className={HorizontalNav}>
                        <li className={HorizontalNavItem}>
                            <Link
                                className={MainLink}
                                href="http://wiki.sk89q.com/wiki/commandbook"
                            >
                                Documentation
                            </Link>
                        </li>
                        <li className={`${HorizontalNavItem} hideSmall`}>
                            <Link
                                className={MainLink}
                                href="https://discord.gg/enginehub"
                            >
                                Discord
                            </Link>
                        </li>
                        <li className={HorizontalNavItem}>
                            <Link
                                className={MainLink}
                                href="https://github.com/EngineHub/CommandBook/issues"
                            >
                                Bug / Feature Tracker
                            </Link>
                        </li>
                        <li className={HorizontalNavItem}>
                            <Link
                                className={MainLink}
                                href="https://github.com/EngineHub/CommandBook"
                            >
                                Source Code
                            </Link>
                        </li>
                    </ul>
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
                                <Link
                                    className={`${Button} ${PrimaryButton}`}
                                    href={
                                        'http://dev.bukkit.org/bukkit-plugins/commandbook/files/'
                                    }
                                >
                                    Stable builds for Bukkit
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className={`${Button} ${SecondaryButton}`}
                                    href={
                                        'http://builds.enginehub.org/job/commandbook'
                                    }
                                >
                                    Experimental builds for Bukkit
                                </Link>
                            </p>
                            <p>
                                <span className={`${Label} ${WarningLabel}`}>
                                    Note!
                                </span>{' '}
                                CommandBook requires that{' '}
                                <Link className={MainLink} href="/worldedit/">
                                    WorldEdit
                                </Link>{' '}
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

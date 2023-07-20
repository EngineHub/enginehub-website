import Layout from '../src/components/Layout';
import {
    SEO,
    ContainerPadded,
    Container,
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
    SectionHeading,
    MainLink,
    Label,
    Button,
    SecondaryButton,
    PrimaryButton
} from '@enginehub/shared';
import PlatformBanner from '../src/components/PlatformBanner';
import headerLogo from '../src/images/projects/headers/worldguard-header.svg';
import bukkitLogo from '../src/images/platforms/bukkit-logo.png';
import worldGuardLogo from '../src/images/projects/worldguard-icon.png';
import Image from 'next/image';
import Link from 'next/link';

const WorldGuardPage = () => {
    return (
        <Layout>
            <SEO
                title="WorldGuard"
                description="WorldGuard lets you and players guard areas of land against griefers and undesirables, as well as tweak and disable various gameplay features of Minecraft."
                image={worldGuardLogo.src}
            />
            <div className={`${Container} ${ContainerPadded}`}>
                <div className={Row}>
                    <div className={JumbotronContainer}>
                        <div className={JumbotronImageBox}>
                            <h1>
                                <Image src={headerLogo} alt="WorldGuard" />
                            </h1>
                        </div>
                        <h2 className={JumbotronText}>
                            WorldGuard lets you and players guard areas of land
                            against griefers and undesirables, as well as tweak
                            and disable various gameplay features of Minecraft.
                        </h2>
                        <div className={JumbotronButtonBox}>
                            <Link
                                className={`${Button} ${PrimaryButton}`}
                                href={'/worldguard/#downloads'}
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
                                href="https://worldguard.enginehub.org"
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
                                href="https://github.com/EngineHub/WorldGuard/issues"
                            >
                                Bug / Feature Tracker
                            </Link>
                        </li>
                        <li className={HorizontalNavItem}>
                            <Link
                                className={MainLink}
                                href="https://github.com/EngineHub/WorldGuard"
                            >
                                Source Code
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={Row}>
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
                </div>
                <div className={Row}>
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
                </div>
                <div className={Row}>
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
                            src="https://www.youtube.com/embed/2BaA6ma8L-E?theme=light&amp;rel=0"
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
                            <p>We officially support WorldGuard for Bukkit.</p>
                            <p>
                                <Link
                                    className={`${Button} ${PrimaryButton}`}
                                    href={
                                        'http://dev.bukkit.org/bukkit-plugins/worldguard/files/'
                                    }
                                >
                                    Stable builds for Bukkit
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className={`${Button} ${SecondaryButton}`}
                                    href={
                                        'http://builds.enginehub.org/job/worldguard'
                                    }
                                >
                                    Experimental builds for Bukkit
                                </Link>
                            </p>
                            <p>
                                <span className={`${Label} ${WarningLabel}`}>
                                    Note!
                                </span>{' '}
                                WorldGuard requires that{' '}
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

export default WorldGuardPage;

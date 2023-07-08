import Layout from '../src/components/Layout';
import {
    SEO,
    ContainerPadded,
    Row,
    ColumnHalf,
    JumbotronButtonBox,
    JumbotronContainer,
    JumbotronImageBox,
    JumbotronText,
    SectionHeading,
    WarningLabel,
    InfoLabel,
    HorizontalNav,
    HorizontalNavItem,
    AlignedContent,
    MainLink,
    GrayButton,
    BlueButton,
    Label
} from '@enginehub/shared';
import PlatformBanner from '../src/components/PlatformBanner';
import craftBookHeader from '../src/images/projects/headers/craftbook-header.svg';
import bukkitLogo from '../src/images/platforms/bukkit-logo.png';
import spongeLogo from '../src/images/platforms/spongepowered-logo.png';
import craftBookLogo from '../src/images/projects/craftbook-icon.png';
import Image from 'next/image';

const CraftBookPage = () => {
    return (
        <Layout>
            <SEO
                title="CraftBook"
                description="CraftBook lets you create magically extending bridges, compact Redstone circuits, complex Minecart mechanics, and much more — all without a client mod and fully customizable by the server."
                image={craftBookLogo.src}
            />
            <ContainerPadded>
                <div className={Row}>
                    <JumbotronContainer>
                        <JumbotronImageBox>
                            <h1>
                                <Image src={craftBookHeader} alt="CraftBook" />
                            </h1>
                        </JumbotronImageBox>
                        <JumbotronText>
                            CraftBook lets you create magically extending
                            bridges, compact Redstone circuits, complex Minecart
                            mechanics, and much more — all without a client mod
                            and fully customizable by the server.
                        </JumbotronText>
                        <JumbotronButtonBox>
                            <BlueButton href="/craftbook/#downloads">
                                List downloads
                            </BlueButton>
                        </JumbotronButtonBox>
                    </JumbotronContainer>
                </div>
                <div className={Row}>
                    <HorizontalNav>
                        <HorizontalNavItem>
                            <MainLink href="/documentation/">
                                Documentation
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem className={'hideSmall'}>
                            <MainLink href="https://discord.gg/enginehub">
                                Discord
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainLink href="https://github.com/EngineHub/CraftBook/issues">
                                Bug / Feature Tracker
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainLink href="https://github.com/EngineHub/CraftBook">
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
                            <span className={`${Label} ${InfoLabel}`}>
                                Did you know?
                            </span>{' '}
                            CraftBook is one of Minecraft's first mods/plugins.
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
                            height="300"
                            src="https://www.youtube.com/embed/nNb6jZYk55I?theme=light&amp;rel=0"
                            frameBorder={0}
                            allowFullScreen={true}
                        />
                    </div>
                    <div className={ColumnHalf}>
                        <iframe
                            width="100%"
                            height="300"
                            src="https://www.youtube.com/embed/OpKlSDPyR0M?theme=light&amp;rel=0"
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
                            <p>We officially support CraftBook for Bukkit.</p>
                            <p>
                                <BlueButton
                                    href={
                                        'http://dev.bukkit.org/bukkit-plugins/craftbook/files/'
                                    }
                                >
                                    Stable builds for Bukkit
                                </BlueButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'http://builds.enginehub.org/job/craftbook?branch=master'
                                    }
                                >
                                    Experimental builds for Bukkit
                                </GrayButton>
                            </p>
                            <p>
                                <span className={`${Label} ${WarningLabel}`}>
                                    Note!
                                </span>{' '}
                                CraftBook requires that{' '}
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
                        <PlatformBanner img={spongeLogo} alt={'SpongePowered'}>
                            <p>We officially support CraftBook for Sponge.</p>
                            <p>
                                <BlueButton
                                    href={
                                        'https://ore.spongepowered.org/EngineHub/CraftBook'
                                    }
                                >
                                    Stable builds for Sponge
                                </BlueButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'http://builds.enginehub.org/job/craftbook?branch=4.x'
                                    }
                                >
                                    Experimental builds for Sponge
                                </GrayButton>
                            </p>
                            <p>
                                <span className={`${Label} ${WarningLabel}`}>
                                    Note!
                                </span>{' '}
                                CraftBook requires that{' '}
                                <MainLink href="/worldedit/">
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
                    </div>
                </div>
            </ContainerPadded>
        </Layout>
    );
};

export default CraftBookPage;

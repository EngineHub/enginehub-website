import Layout from '../src/components/Layout';
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
    JumbotronContainer,
    MainLink,
    BlueButton,
    Label,
    Container
} from '@enginehub/shared';
import PlatformBanner from '../src/components/PlatformBanner';
import commandHelperHeader from '../src/images/projects/headers/commandhelper-header.svg';
import bukkitLogo from '../src/images/platforms/bukkit-logo.png';
import commandHelperLogo from '../src/images/projects/commandhelper-icon.png';
import Image from 'next/image';

const CommandHelperPage = () => {
    return (
        <Layout discordOverride={'https://discord.gg/Z7jpHed'}>
            <SEO
                title="CommandHelper"
                description="CommandHelper lets you create easy-to-write and 'hot-reloadable' scripts for your Bukkit server to handle events and perform tasks — no Java knowledge required!"
                image={commandHelperLogo.src}
            />
            <div className={`${Container} ${ContainerPadded}`}>
                <div className={Row}>
                    <JumbotronContainer>
                        <JumbotronImageBox>
                            <h1>
                                <Image
                                    alt={'CommandHelper'}
                                    src={commandHelperHeader}
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
                            <BlueButton href="/commandhelper/#downloads">
                                List downloads
                            </BlueButton>
                        </JumbotronButtonBox>
                    </JumbotronContainer>
                </div>
                <div className={Row}>
                    <HorizontalNav>
                        <HorizontalNavItem>
                            <MainLink href="https://methodscript.com/docs/">
                                Documentation
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem className={'hideSmall'}>
                            <MainLink href="https://discord.gg/Z7jpHed">
                                Discord
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainLink href="https://github.com/EngineHub/CommandHelper/issues">
                                Bug / Feature Tracker
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainLink href="https://github.com/EngineHub/CommandHelper">
                                Source Code
                            </MainLink>
                        </HorizontalNavItem>
                    </HorizontalNav>
                </div>
                <div className={Row}>
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
                </div>
                <div className={Row}>
                    <div>
                        <h3 className={SectionHeading} id="downloads">
                            Downloads
                        </h3>
                        <p>Please choose a download for your platform.</p>
                        <PlatformBanner img={bukkitLogo} alt={'Bukkit'}>
                            <p>
                                We officially support CommandHelper for Bukkit.
                            </p>
                            <p>
                                <BlueButton
                                    href={
                                        'http://builds.enginehub.org/job/commandhelper/'
                                    }
                                >
                                    Download builds for Bukkit
                                </BlueButton>
                            </p>
                            <p>
                                <span className={`${Label} ${InfoLabel}`}>
                                    Note!
                                </span>{' '}
                                Stable builds are no longer released — the
                                builds above are built from the latest code.
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

export default CommandHelperPage;

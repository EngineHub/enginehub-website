import Link from 'next/link';

import {
    Button,
    ColumnQuarter,
    ColumnThreeQuarter,
    Container,
    ContainerPadded,
    PrimaryButton,
    Row,
    SecondaryButton,
    SectionHeading,
    SEO,
    SidebarHeading
} from '@enginehub/shared';

import Layout from '../src/components/Layout';
import PlatformBanner from '../src/components/PlatformBanner';
import SidebarIcon from '../src/components/sidebar/SidebarIcon';
import CmdBookHeader from '../src/images/projects/headers/commandbook-header.svg';
import CmdHelperHeader from '../src/images/projects/headers/commandhelper-header.svg';
import CraftBookHeader from '../src/images/projects/headers/craftbook-header.svg';
import WorldEditHeader from '../src/images/projects/headers/worldedit-header.svg';
import WorldGuardHeader from '../src/images/projects/headers/worldguard-header.svg';

const DocumentationPage = () => {
    return (
        <Layout>
            <SEO
                title="Documentation"
                description="Documentation for the EngineHub projects. Home to the docs of WorldEdit, WorldGuard, CraftBook, CommandBook, CommandHelper, and more."
                image={'/images/enginehub-logo.png'}
            />
            <div className={`${Container} ${ContainerPadded}`}>
                <div className={Row}>
                    <div className={ColumnQuarter}>
                        <SidebarIcon
                            src={'/images/enginehub-logo.png'}
                            alt={'EngineHub Logo'}
                        />
                        <h1 className={SidebarHeading}>Docs</h1>
                    </div>
                    <div className={ColumnThreeQuarter}>
                        <h3 className={SectionHeading} id="documentation">
                            Documentation
                        </h3>
                        <p>Documentation for the following is available:</p>
                        <PlatformBanner
                            img={{ src: WorldEditHeader }}
                            alt={'WorldEdit'}
                        >
                            <p>
                                <Link
                                    className={`${Button} ${PrimaryButton}`}
                                    href={
                                        'https://worldedit.enginehub.org/en/latest/'
                                    }
                                >
                                    WorldEdit Docs
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className={`${Button} ${SecondaryButton}`}
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-core/release/'
                                    }
                                >
                                    WorldEdit Core JavaDocs
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className={`${Button} ${SecondaryButton}`}
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-bukkit/release/'
                                    }
                                >
                                    WorldEdit Bukkit JavaDocs
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className={`${Button} ${SecondaryButton}`}
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-sponge/release/'
                                    }
                                >
                                    WorldEdit Sponge JavaDocs
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className={`${Button} ${SecondaryButton}`}
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-cli/release/'
                                    }
                                >
                                    WorldEdit CLI JavaDocs
                                </Link>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            img={{ src: WorldGuardHeader }}
                            alt={'WorldGuard'}
                        >
                            <p>
                                <Link
                                    className={`${Button} ${PrimaryButton}`}
                                    href={
                                        'https://worldguard.enginehub.org/en/latest/'
                                    }
                                >
                                    WorldGuard Docs
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className={`${Button} ${SecondaryButton}`}
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldguard/worldguard-core/release/'
                                    }
                                >
                                    WorldGuard Core JavaDocs
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className={`${Button} ${SecondaryButton}`}
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldguard/worldguard-bukkit/release/'
                                    }
                                >
                                    WorldGuard Bukkit JavaDocs
                                </Link>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            img={{ src: CraftBookHeader }}
                            alt={'CraftBook'}
                        >
                            <p>
                                <Link
                                    className={`${Button} ${PrimaryButton}`}
                                    href={
                                        'https://craftbook.enginehub.org/en/3.x/'
                                    }
                                >
                                    CraftBook 3 Docs (Spigot)
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className={`${Button} ${PrimaryButton}`}
                                    href={
                                        'https://craftbook.enginehub.org/en/latest/'
                                    }
                                >
                                    CraftBook 4 Docs (Sponge)
                                </Link>
                            </p>
                            <p>
                                <Link
                                    className={`${Button} ${PrimaryButton}`}
                                    href={
                                        'https://craftbook.enginehub.org/en/5.0.0/'
                                    }
                                >
                                    CraftBook 5 Docs (Alpha - Spigot)
                                </Link>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            img={{ src: CmdBookHeader }}
                            alt={'CommandBook'}
                        >
                            <p>
                                <Link
                                    className={`${Button} ${PrimaryButton}`}
                                    href={
                                        'https://web.archive.org/web/20181222152247/http://wiki.sk89q.com/wiki/CommandBook'
                                    }
                                >
                                    CommandBook Docs
                                </Link>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            img={{ src: CmdHelperHeader }}
                            alt={'CommandHelper'}
                        >
                            <p>
                                <Link
                                    className={`${Button} ${PrimaryButton}`}
                                    href={'https://methodscript.com/docs/'}
                                >
                                    CommandHelper Docs
                                </Link>
                            </p>
                        </PlatformBanner>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DocumentationPage;

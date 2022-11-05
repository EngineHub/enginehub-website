import Layout from '../src/components/Layout';
import {
    SEO,
    ContainerPadded,
    Row,
    ColumnQuarter,
    ColumnThreeQuarter,
    SidebarHeading,
    SectionHeading,
    BlueButton,
    GrayButton
} from '@enginehub/shared';
import SidebarIcon from '../src/components/sidebar/SidebarIcon';
import PlatformBanner from '../src/components/PlatformBanner';
import WorldEditHeader from '../src/images/projects/headers/worldedit-header.svg';
import WorldGuardHeader from '../src/images/projects/headers/worldguard-header.svg';
import CraftBookHeader from '../src/images/projects/headers/craftbook-header.svg';
import CmdBookHeader from '../src/images/projects/headers/commandbook-header.svg';
import CmdHelperHeader from '../src/images/projects/headers/commandhelper-header.svg';

const DocumentationPage = () => {
    return (
        <Layout>
            <SEO
                title="Documentation"
                description="Documentation for the EngineHub projects. Home to the docs of WorldEdit, WorldGuard, CraftBook, CommandBook, CommandHelper, and more."
                image={'/images/enginehub-logo.png'}
            />
            <ContainerPadded>
                <Row>
                    <ColumnQuarter>
                        <SidebarIcon
                            src={'/images/enginehub-logo.png'}
                            alt={'EngineHub Logo'}
                        />
                        <SidebarHeading>Docs</SidebarHeading>
                    </ColumnQuarter>
                    <ColumnThreeQuarter>
                        <SectionHeading id="documentation">
                            Documentation
                        </SectionHeading>
                        <p>Documentation for the following is available:</p>
                        <PlatformBanner
                            img={{ src: WorldEditHeader }}
                            alt={'WorldEdit'}
                        >
                            <p>
                                <BlueButton
                                    href={
                                        'https://worldedit.enginehub.org/en/latest/'
                                    }
                                >
                                    WorldEdit Docs
                                </BlueButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-core/release/'
                                    }
                                >
                                    WorldEdit Core JavaDocs
                                </GrayButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-bukkit/release/'
                                    }
                                >
                                    WorldEdit Bukkit JavaDocs
                                </GrayButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-sponge/release/'
                                    }
                                >
                                    WorldEdit Sponge JavaDocs
                                </GrayButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldedit/worldedit-cli/release/'
                                    }
                                >
                                    WorldEdit CLI JavaDocs
                                </GrayButton>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            img={{ src: WorldGuardHeader }}
                            alt={'WorldGuard'}
                        >
                            <p>
                                <BlueButton
                                    href={
                                        'https://worldguard.enginehub.org/en/latest/'
                                    }
                                >
                                    WorldGuard Docs
                                </BlueButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldguard/worldguard-core/release/'
                                    }
                                >
                                    WorldGuard Core JavaDocs
                                </GrayButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'https://docs.enginehub.org/javadoc/com.sk89q.worldguard/worldguard-bukkit/release/'
                                    }
                                >
                                    WorldGuard Bukkit JavaDocs
                                </GrayButton>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            img={{ src: CraftBookHeader }}
                            alt={'CraftBook'}
                        >
                            <p>
                                <BlueButton
                                    href={
                                        'https://craftbook.enginehub.org/en/3.x/'
                                    }
                                >
                                    CraftBook 3 Docs (Spigot)
                                </BlueButton>
                            </p>
                            <p>
                                <BlueButton
                                    href={
                                        'https://craftbook.enginehub.org/en/latest/'
                                    }
                                >
                                    CraftBook 4 Docs (Sponge)
                                </BlueButton>
                            </p>
                            <p>
                                <BlueButton
                                    href={
                                        'https://craftbook.enginehub.org/en/5.0.0/'
                                    }
                                >
                                    CraftBook 5 Docs (Alpha - Spigot)
                                </BlueButton>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            img={{ src: CmdBookHeader }}
                            alt={'CommandBook'}
                        >
                            <p>
                                <BlueButton
                                    href={
                                        'http://web.archive.org/web/20181222152247/http://wiki.sk89q.com/wiki/CommandBook'
                                    }
                                >
                                    CommandBook Docs
                                </BlueButton>
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            img={{ src: CmdHelperHeader }}
                            alt={'CommandHelper'}
                        >
                            <p>
                                <BlueButton
                                    href={'https://methodscript.com/docs/'}
                                >
                                    CommandHelper Docs
                                </BlueButton>
                            </p>
                        </PlatformBanner>
                    </ColumnThreeQuarter>
                </Row>
            </ContainerPadded>
        </Layout>
    );
};

export default DocumentationPage;
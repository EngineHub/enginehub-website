import Layout from '../src/components/Layout';
import {
    SEO,
    ContainerPadded,
    Row,
    ColumnHalf,
    JumbotronText,
    JumbotronButtonBox,
    JumbotronImageBox,
    JumbotronContainer,
    HorizontalNav,
    HorizontalNavItem,
    AlignedContent,
    SectionHeading,
    WarningLabel,
    MainLink,
    GrayButton,
    BlueButton,
    Label
} from '@enginehub/shared';
import PlatformBanner from '../src/components/PlatformBanner';
import worldEditHeader from '../src/images/projects/headers/worldedit-header.svg';
import bukkitLogo from '../src/images/platforms/bukkit-logo.png';
import forgeLogo from '../src/images/platforms/forge-logo.png';
import fabricLogo from '../src/images/platforms/fabric-logo.png';
import spongeLogo from '../src/images/platforms/spongepowered-logo.png';
import mceduLogo from '../src/images/platforms/mcedu-logo.png';
import liteloaderLogo from '../src/images/platforms/liteloader-logo.png';
import worldEditLogo from '../src/images/projects/worldedit-icon.png';
import Image from 'next/image';

const WorldEditPage = () => {
    return (
        <Layout>
            <SEO
                title="WorldEdit"
                description="WorldEdit lets you build fast and smart. Get started with the essential building tool used by almost all professional Minecraft builders today"
                image={worldEditLogo.src}
            />
            <ContainerPadded>
                <div className={Row}>
                    <JumbotronContainer>
                        <JumbotronImageBox>
                            <h1>
                                <Image
                                    src={worldEditHeader}
                                    alt={'WorldEdit'}
                                    loading={'eager'}
                                />
                            </h1>
                        </JumbotronImageBox>
                        <JumbotronText>
                            WorldEdit lets you build <em>fast</em> and{' '}
                            <em>smart</em>. Why should you spend your time
                            building a wall or excavating a hole when you can
                            work on something <em>creative</em>? Get started
                            with the essential building tool used by almost all
                            professional Minecraft builders today!
                        </JumbotronText>
                        <JumbotronButtonBox>
                            <BlueButton href={'/worldedit/#downloads'}>
                                Go to downloads
                            </BlueButton>
                        </JumbotronButtonBox>
                    </JumbotronContainer>
                </div>
                <div className={Row}>
                    <HorizontalNav>
                        <HorizontalNavItem>
                            <MainLink href="https://worldedit.enginehub.org">
                                Documentation
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem className={'hideSmall'}>
                            <MainLink href="https://discord.gg/enginehub">
                                Discord
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainLink href="https://github.com/EngineHub/WorldEdit/issues">
                                Bug / Feature Tracker
                            </MainLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainLink href="https://github.com/EngineHub/WorldEdit">
                                Source Code
                            </MainLink>
                        </HorizontalNavItem>
                    </HorizontalNav>
                </div>
                <div className={Row}>
                    <AlignedContent
                        header={'Build With Speed'}
                        align={'left'}
                        video={'/videos/worldedit_brushes.mp4'}
                    >
                        <ul>
                            <li>
                                Create more impressive and much larger builds
                                with less time
                            </li>
                            <li>
                                Fix griefing and other issues without shutting
                                down your server
                            </li>
                            <li>
                                Quickly create, replace or delete tens of
                                thousands of blocks in seconds
                            </li>
                            <li>
                                Level an entire mountain and replace it with
                                natural looking terrain
                            </li>
                            <li>
                                Use hand-bound tools and brushes to quickly
                                build mountains
                            </li>
                        </ul>
                    </AlignedContent>
                </div>
                <div className={Row}>
                    <AlignedContent
                        header={'Have Complete Control'}
                        align={'right'}
                        video={'/videos/worldedit_copy_paste.mp4'}
                    >
                        <ul>
                            <li>
                                Generate spheres, cylinders, cuboids, forests,
                                pumpkin patches, and snowy areas
                            </li>
                            <li>
                                Use your compass to quickly teleport to areas by
                                left clicking or using /jumpto
                            </li>
                            <li>
                                Choose an area and have it instantly restored
                                from backups
                            </li>
                            <li>
                                Copy areas, paste them, load them, and save them
                                as schematics
                            </li>
                        </ul>
                    </AlignedContent>
                </div>
                <div className={Row}>
                    <AlignedContent
                        header={'Advanced Editing Features'}
                        align={'left'}
                        video={'/videos/worldedit_gen_deform.mp4'}
                    >
                        <ul>
                            <li>
                                Manipulate terrain with complex deformations
                                such as <code>{`//deform x*=2;y*=2;z*=2`}</code>
                            </li>
                            <li>
                                Evaluate mathematical expressions such as{' '}
                                <code>{`//g stone (0.75-sqrt(x^2+y^2))^2+z^2 < 0.25^2`}</code>
                            </li>
                            <li>
                                Write complex scripts to manipulate the world
                                with the full power of WorldEdit using
                                JavaScript
                            </li>
                            <li>Many more! There are over 100 functions</li>
                        </ul>
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
                            src="https://www.youtube.com/embed/yl1hTctucOc?theme=light&amp;rel=0"
                            frameBorder={0}
                            allowFullScreen={true}
                        />
                    </div>
                    <div className={ColumnHalf}>
                        <iframe
                            width="100%"
                            height="300"
                            src="https://www.youtube.com/embed/72HlPD9CW10?theme=light&amp;rel=0"
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
                            <p>We officially support WorldEdit for Bukkit.</p>
                            <p>
                                <BlueButton
                                    href={
                                        'http://dev.bukkit.org/bukkit-plugins/worldedit/files/'
                                    }
                                >
                                    Stable builds for Bukkit
                                </BlueButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'http://builds.enginehub.org/job/worldedit'
                                    }
                                >
                                    Experimental builds for Bukkit
                                </GrayButton>
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
                        <PlatformBanner img={forgeLogo} alt={'Minecraft Forge'}>
                            <p>
                                We officially support WorldEdit for
                                MinecraftForge.
                            </p>
                            <p>
                                <BlueButton
                                    href={
                                        'https://minecraft.curseforge.com/projects/worldedit'
                                    }
                                >
                                    Stable builds for Forge
                                </BlueButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'http://builds.enginehub.org/job/worldedit'
                                    }
                                >
                                    Experimental builds for Forge
                                </GrayButton>
                            </p>
                            <ol>
                                <li>
                                    Find the <em>mods</em> folder inside your
                                    Minecraft client/server's folder.
                                </li>
                                <li>
                                    Place the downloaded ".jar" file in your
                                    mods folder.
                                </li>
                                <li>
                                    Start your server or client as you may have
                                    done before.
                                </li>
                                <li>
                                    Either configure your permissions plugin (if
                                    you are using one); otherwise, use{' '}
                                    <b>/op your_name</b> to make yourself a
                                    server operator.
                                </li>
                            </ol>
                        </PlatformBanner>
                        <PlatformBanner img={fabricLogo} alt={'Fabric'}>
                            <p>We officially support WorldEdit for Fabric.</p>
                            <p>
                                <BlueButton
                                    href={
                                        'https://minecraft.curseforge.com/projects/worldedit'
                                    }
                                >
                                    Stable builds for Fabric
                                </BlueButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'http://builds.enginehub.org/job/worldedit'
                                    }
                                >
                                    Experimental builds for Fabric
                                </GrayButton>
                            </p>
                            <ol>
                                <li>
                                    Find the <em>mods</em> folder inside your
                                    Minecraft client/server's folder.
                                </li>
                                <li>
                                    Place the downloaded ".jar" file in your
                                    mods folder.
                                </li>
                                <li>
                                    Start your server or client as you may have
                                    done before.
                                </li>
                                <li>
                                    Either configure your permissions mods (if
                                    you are using one); otherwise, use{' '}
                                    <b>/op your_name</b> to make yourself a
                                    server operator.
                                </li>
                            </ol>
                        </PlatformBanner>
                        <PlatformBanner img={spongeLogo} alt={'SpongePowered'}>
                            <p>We officially support WorldEdit for Sponge.</p>
                            <p>
                                <BlueButton
                                    href={
                                        'https://ore.spongepowered.org/enginehub/WorldEdit'
                                    }
                                >
                                    Stable builds for Sponge
                                </BlueButton>
                            </p>
                            <p>
                                <GrayButton
                                    href={
                                        'http://builds.enginehub.org/job/worldedit'
                                    }
                                >
                                    Experimental builds for Sponge
                                </GrayButton>
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
                        <PlatformBanner img={mceduLogo} alt={'MinecraftEdu'}>
                            <p>
                                MinecraftEdu comes bundled with an (older)
                                version of WorldEdit. While we can assist with
                                usage of WorldEdit, we are unable to assist with
                                the update or installation of WorldEdit with
                                MinecraftEdu.
                            </p>
                        </PlatformBanner>
                        <PlatformBanner img={liteloaderLogo} alt={'LiteLoader'}>
                            <p>
                                We do not officially support LiteLoader, but you
                                can download{' '}
                                <MainLink
                                    href={
                                        'http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/1294341-worldeditwrapper-use-worldedit-in-single-player'
                                    }
                                >
                                    an unofficial WorldEditWrapper
                                </MainLink>{' '}
                                that supports Minecraft 1.7.2.
                            </p>
                            <p>
                                <span className={`${Label} ${WarningLabel}`}>
                                    Note!
                                </span>{' '}
                                Some features, such as setting biomes or copying
                                and pasting chests may not work with this
                                version.
                            </p>
                        </PlatformBanner>
                    </div>
                </div>
            </ContainerPadded>
        </Layout>
    );
};

export default WorldEditPage;

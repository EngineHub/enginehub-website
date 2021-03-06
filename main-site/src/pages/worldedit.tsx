import { graphql } from 'gatsby';
import Layout from '../components/Layout';
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
    WarningLabel
} from '@enginehub/shared';
import React from 'react';
import { MainOutboundLink } from '../components/Link';
import PlatformBanner from '../components/PlatformBanner';
import {
    GrayOutboundButton,
    BlueButton,
    BlueOutboundButton
} from '../components/Button';
import { ReactComponent as HeaderLogo } from '../images/projects/headers/worldedit-header.svg';
import { getImage } from 'gatsby-plugin-image';
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks';

interface WorldEditPageData {
    file: FileNode & { publicURL: string };
    allFile: { nodes: (FileNode & { name: string })[] };
}

const WorldEditPage = ({ data }: { data: WorldEditPageData }) => {
    const logoMap = new Map(
        data.allFile.nodes.map(node => [node.name, getImage(node)])
    );
    return (
        <Layout>
            <SEO
                title="WorldEdit"
                description="WorldEdit lets you build fast and smart. Get started with the essential building tool used by almost all professional Minecraft builders today"
                image={data.file.publicURL}
            />
            <ContainerPadded>
                <Row>
                    <JumbotronContainer>
                        <JumbotronImageBox>
                            <h1>
                                <HeaderLogo
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
                            <BlueButton to={'/worldedit/#downloads'}>
                                Go to downloads
                            </BlueButton>
                        </JumbotronButtonBox>
                    </JumbotronContainer>
                </Row>
                <Row>
                    <HorizontalNav>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://worldedit.enginehub.org">
                                Documentation
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem className={'hideSmall'}>
                            <MainOutboundLink href="https://discord.gg/enginehub">
                                Discord
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://github.com/EngineHub/WorldEdit/issues">
                                Bug / Feature Tracker
                            </MainOutboundLink>
                        </HorizontalNavItem>
                        <HorizontalNavItem>
                            <MainOutboundLink href="https://github.com/EngineHub/WorldEdit">
                                Source Code
                            </MainOutboundLink>
                        </HorizontalNavItem>
                    </HorizontalNav>
                </Row>
                <Row>
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
                </Row>
                <Row>
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
                </Row>
                <Row>
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
                </Row>
                <Row>
                    <SectionHeading id="videos">
                        Watch it in action
                    </SectionHeading>
                </Row>
                <Row>
                    <ColumnHalf>
                        <iframe
                            width="100%"
                            height="300"
                            src="https://www.youtube.com/embed/72HlPD9CW10?theme=light&amp;rel=0"
                            frameBorder={0}
                            allowFullScreen={true}
                        />
                    </ColumnHalf>
                    <ColumnHalf>
                        <iframe
                            width="100%"
                            height="300"
                            src="https://www.youtube.com/embed/yl1hTctucOc?theme=light&amp;rel=0"
                            frameBorder={0}
                            allowFullScreen={true}
                        />
                    </ColumnHalf>
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
                            <p>We officially support WorldEdit for Bukkit.</p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'http://dev.bukkit.org/bukkit-plugins/worldedit/files/'
                                    }
                                >
                                    Stable builds for Bukkit
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'http://builds.enginehub.org/job/worldedit'
                                    }
                                >
                                    Experimental builds for Bukkit
                                </GrayOutboundButton>
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
                        <PlatformBanner
                            logo={logoMap.get('forge-logo')!}
                            alt={'Minecraft Forge'}
                        >
                            <p>
                                We officially support WorldEdit for
                                MinecraftForge.
                            </p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://minecraft.curseforge.com/projects/worldedit'
                                    }
                                >
                                    Stable builds for Forge
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'http://builds.enginehub.org/job/worldedit'
                                    }
                                >
                                    Experimental builds for Forge
                                </GrayOutboundButton>
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
                        <PlatformBanner
                            logo={logoMap.get('fabric-logo')!}
                            alt={'Fabric'}
                        >
                            <p>We officially support WorldEdit for Fabric.</p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://minecraft.curseforge.com/projects/worldedit'
                                    }
                                >
                                    Stable builds for Fabric
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'http://builds.enginehub.org/job/worldedit'
                                    }
                                >
                                    Experimental builds for Fabric
                                </GrayOutboundButton>
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
                        <PlatformBanner
                            logo={logoMap.get('spongepowered-logo')!}
                            alt={'SpongePowered'}
                        >
                            <p>We officially support WorldEdit for Sponge.</p>
                            <p>
                                <BlueOutboundButton
                                    href={
                                        'https://ore.spongepowered.org/enginehub/WorldEdit'
                                    }
                                >
                                    Stable builds for Sponge
                                </BlueOutboundButton>
                            </p>
                            <p>
                                <GrayOutboundButton
                                    href={
                                        'http://builds.enginehub.org/job/worldedit'
                                    }
                                >
                                    Experimental builds for Sponge
                                </GrayOutboundButton>
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
                        <PlatformBanner
                            logo={logoMap.get('mcedu-logo')!}
                            alt={'MinecraftEdu'}
                        >
                            <p>
                                MinecraftEdu comes bundled with an (older)
                                version of WorldEdit. While we can assist with
                                usage of WorldEdit, we are unable to assist with
                                the update or installation of WorldEdit with
                                MinecraftEdu.
                            </p>
                        </PlatformBanner>
                        <PlatformBanner
                            logo={logoMap.get('liteloader-logo')!}
                            alt={'LiteLoader'}
                        >
                            <p>
                                We do not officially support LiteLoader, but you
                                can download{' '}
                                <MainOutboundLink
                                    href={
                                        'http://www.minecraftforum.net/forums/mapping-and-modding/minecraft-mods/1294341-worldeditwrapper-use-worldedit-in-single-player'
                                    }
                                >
                                    an unofficial WorldEditWrapper
                                </MainOutboundLink>{' '}
                                that supports Minecraft 1.7.2.
                            </p>
                            <p>
                                <WarningLabel>Note!</WarningLabel> Some
                                features, such as setting biomes or copying and
                                pasting chests may not work with this version.
                            </p>
                        </PlatformBanner>
                    </div>
                </Row>
            </ContainerPadded>
        </Layout>
    );
};

export default WorldEditPage;

export const query = graphql`
    query {
        file(name: { eq: "worldedit-icon" }) {
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
        allFile(
            filter: {
                name: {
                    in: [
                        "bukkit-logo"
                        "forge-logo"
                        "fabric-logo"
                        "mcedu-logo"
                        "liteloader-logo"
                        "canarymod-logo"
                        "spongepowered-logo"
                    ]
                }
            }
        ) {
            nodes {
                childImageSharp {
                    gatsbyImageData(width: 150, quality: 100, layout: FIXED)
                }
                name
            }
        }
    }
`;

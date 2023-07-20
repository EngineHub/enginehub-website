import type { FunctionComponent } from 'react';
import { Navbar, Container } from '@enginehub/shared';
import Image from 'next/image';
import landingBg from '../images/landing-bg.jpg';
import {
    HeaderContent,
    HeaderWrapper,
    LandingText,
    Subtitle,
    Title
} from './Landing.module.css';

interface LandingProps {
    discordOverride?: string;
}

export const Landing: FunctionComponent<LandingProps> = ({
    discordOverride
}) => {
    return (
        <div className={HeaderWrapper}>
            <div
                style={{ width: '100%', height: '100%', position: 'relative' }}
            >
                <Image
                    src={landingBg}
                    loading={'eager'}
                    alt={'EngineHub Landing Background'}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    placeholder="empty"
                />
            </div>
            <div className={HeaderContent}>
                <Navbar
                    headertheme="inverted"
                    discordOverride={discordOverride}
                />
                <div className={LandingText}>
                    <div className={Container}>
                        <h1 className={Title}>
                            Open-source mods for and by the Minecraft community
                        </h1>
                        <h2 className={Subtitle}>
                            We're a collection of mods, plugins, and tools
                            created for Minecraft by members of the community.
                            Our projects are all open source and power all
                            varieties of servers — from the large to the
                            family-sized. Many of our projects are available,
                            officially or unofficially, for Bukkit, Sponge,
                            Minecraft Forge, MinecraftEdu, LiteLoader, and other
                            platforms.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

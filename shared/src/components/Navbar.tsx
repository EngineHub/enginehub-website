import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';

import { BRAND, SECONDARY } from '../theme/index';
import { BrandButton, Button, SecondaryButton } from './Button.module.css';
import { Container } from './Container.module.css';
import { FloatedButton, HeaderLink, Nav } from './Navbar.module.css';

const NavBackgroundColours = {
    default: SECONDARY.darker,
    inverted: '0',
    purple: BRAND.darker
};

const HeaderTextColors = {
    default: SECONDARY.font,
    inverted: BRAND.font,
    purple: BRAND.font
};

interface NavbarProps {
    discordOverride?: string;
    headertheme?: 'default' | 'inverted' | 'purple';
    headertitle?: string;
    showSponsor?: boolean;
}

export const Navbar: FC<PropsWithChildren<NavbarProps>> = ({
    headertheme = 'default',
    headertitle = 'EngineHub',
    discordOverride,
    showSponsor = true,
    children
}) => {
    const buttonStyle =
        headertheme === 'default' ? SecondaryButton : BrandButton;
    return (
        <nav
            className={Nav}
            style={{ background: NavBackgroundColours[headertheme] }}
        >
            <div className={Container}>
                <div>
                    <Link
                        className={HeaderLink}
                        href="/"
                        style={{ color: HeaderTextColors[headertheme] }}
                    >
                        {headertitle}
                    </Link>
                </div>
                {showSponsor && (
                    <div>
                        <a
                            className={`${Button} ${buttonStyle} ${FloatedButton}`}
                            href="https://github.com/sponsors/EngineHub"
                        >
                            Support Us
                        </a>
                    </div>
                )}
                <div>
                    <a
                        className={`${Button} ${buttonStyle} ${FloatedButton}`}
                        href={discordOverride ?? 'https://discord.gg/enginehub'}
                    >
                        Ask questions on Discord
                    </a>
                </div>
                {children}
            </div>
        </nav>
    );
};

import Link from 'next/link';
import type { FC } from 'react';

import {
    Button,
    ButtonArea,
    DesktopLink,
    MainHeader,
    SiteLink,
    SiteTitle
} from './Header.module.css';

interface HeaderProps {
    showHelp: boolean;
    saveCallback?: () => void;
}

export const Header: FC<HeaderProps> = ({ showHelp, saveCallback }) => (
    <header className={MainHeader}>
        <Link
            className={`${SiteLink} ${SiteTitle}`}
            href="https://enginehub.org/"
        >
            EngineHub
        </Link>
        <h1 className={SiteTitle}>
            <Link className={SiteLink} href="/">
                Pastebin
            </Link>
        </h1>
        <div className={ButtonArea}>
            <a
                className={`${Button} ${DesktopLink}`}
                href="https://discord.gg/enginehub"
            >
                Ask questions on Discord
            </a>
            <a
                className={`${Button} ${DesktopLink}`}
                href="https://github.com/sponsors/EngineHub"
            >
                Support Us
            </a>
            {showHelp && (
                <span className={Button} onClick={saveCallback}>
                    ctrl + s to save
                </span>
            )}
        </div>
    </header>
);

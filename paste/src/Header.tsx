import Link from 'next/link';
import type { FC } from 'react';

import { LabelledSponsorsArea } from '@enginehub/shared';

import {
    Button,
    ButtonArea,
    FloatedSponsor,
    MainHeader,
    SiteLink,
    SiteTitle,
    SupportLink
} from './Header.module.css';

interface HeaderProps {
    showHelp: boolean;
    saveCallback?: () => void;
}

export const Header: FC<HeaderProps> = ({ showHelp, saveCallback }) => (
    <header className={MainHeader}>
        <h1 className={SiteTitle}>
            <Link className={SiteLink} href="/">
                Pastebin
            </Link>
        </h1>
        <LabelledSponsorsArea className={FloatedSponsor} />
        <div className={ButtonArea}>
            <a
                className={`${Button} ${SupportLink}`}
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

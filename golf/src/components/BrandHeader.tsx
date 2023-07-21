import { Logo } from './Logo/Logo';
import Link from 'next/link';
import type { FC } from 'react';
import {
    HeaderLink,
    HorizontalDiv,
    Container,
    TitleContainer,
    HomePageHeader,
    OtherPageHeader
} from './BrandHeader.module.css';

export const BrandHeader: FC<{ isHomePage?: boolean }> = ({
    isHomePage = false
}) => {
    const ContainerStyle = isHomePage ? HomePageHeader : OtherPageHeader;
    return (
        <div>
            <div
                className={`${Container} ${TitleContainer} ${ContainerStyle}}`}
            >
                <Link className={HeaderLink} href="/">
                    <div className={HorizontalDiv}>
                        <Logo />
                        <h1 style={{ marginLeft: '0.5rem' }}>WorldEdit Golf</h1>
                    </div>
                </Link>
            </div>
            {isHomePage && (
                <div className={`${Container} ${ContainerStyle}`}>
                    <h2>For WorldEdit pros, every command counts</h2>
                    <p>
                        Pick a challenge, write some commands, and see how you
                        stack up.
                    </p>
                </div>
            )}
        </div>
    );
};

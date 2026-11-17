import type { FC, PropsWithChildren } from 'react';

import type { FooterProps } from './Footer';
import { Footer } from './Footer';
import { Header } from './Header';
import { Main, MainContainer } from './Layout.module.css';

interface LayoutProps extends FooterProps {
    showHelp?: boolean;
    saveCallback?: () => void;
}

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
    children,
    showHelp = true,
    saveCallback,
    paste,
    metadata,
    extension
}) => (
    <div className={MainContainer}>
        <Header showHelp={showHelp} saveCallback={saveCallback} />
        <main className={Main}>{children}</main>
        <Footer paste={paste} metadata={metadata} extension={extension} />
    </div>
);

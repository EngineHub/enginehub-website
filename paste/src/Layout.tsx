import React, { FC } from 'react';
import { Header } from './Header';
import './layout.css';
import SEO from '@shared/components/seo';

interface LayoutProps {
    showHelp?: boolean;
}

export const Layout: FC<LayoutProps> = ({ children, showHelp = true }) => (
    <>
        <SEO
            title="Pastebin at EngineHub"
            description="EngineHub Pastebin Service"
        />
        <Header showHelp={showHelp} />
        <main>{children}</main>
    </>
);

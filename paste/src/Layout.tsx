import React, { FC } from 'react';
import { Header } from './Header';
import './layout.css';
import SEO from '@shared/components/Seo';

interface LayoutProps {
    showHelp?: boolean;
    saveCallback?: () => void;
}

export const Layout: FC<LayoutProps> = ({ children, showHelp = true, saveCallback }) => (
    <>
        <SEO
            title="Pastebin at EngineHub"
            description="EngineHub Pastebin Service. Store logs, profiles, and reports with ease."
        />
        <Header showHelp={showHelp} saveCallback={saveCallback} />
        <main>{children}</main>
    </>
);

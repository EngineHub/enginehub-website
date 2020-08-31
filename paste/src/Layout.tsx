import styled from '@emotion/styled';
import React, { FC } from 'react';
import { Header } from './Header';
import SEO from '@shared/components/Seo';

interface LayoutProps {
    showHelp?: boolean;
    saveCallback?: () => void;
}

const MainContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Main = styled.main`
    width: 100%;
    flex-grow: 1;
    display: flex;
`;

export const Layout: FC<LayoutProps> = ({ children, showHelp = true, saveCallback }) => (
    <>
        <SEO
            title="Pastebin at EngineHub"
            description="EngineHub Pastebin Service. Store logs, profiles, and reports with ease."
        />
        <MainContainer>
            <Header showHelp={showHelp} saveCallback={saveCallback} />
            <Main>{children}</Main>
        </MainContainer>
    </>
);

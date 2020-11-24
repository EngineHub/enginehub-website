import styled from 'styled-components';
import React, { FC } from 'react';
import { Header } from './Header';
import { LabelledSponsorsArea } from '@shared/components/Sponsors';

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

const Footer = styled.div`
    display: flex;
    justify-content: center;
    height: 70px;
`;

export const Layout: FC<LayoutProps> = ({
    children,
    showHelp = true,
    saveCallback
}) => (
    <MainContainer>
        <Header showHelp={showHelp} saveCallback={saveCallback} />
        <Main>{children}</Main>
        <Footer>
            <LabelledSponsorsArea />
        </Footer>
    </MainContainer>
);

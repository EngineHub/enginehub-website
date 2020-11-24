import styled from 'styled-components';
import React, { FC } from 'react';
import { Header } from './Header';

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

export const Layout: FC<LayoutProps> = ({
    children,
    showHelp = true,
    saveCallback
}) => (
    <MainContainer>
        <Header showHelp={showHelp} saveCallback={saveCallback} />
        <Main>{children}</Main>
    </MainContainer>
);

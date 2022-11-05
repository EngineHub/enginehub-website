import styled from 'styled-components';
import type { FC, PropsWithChildren } from 'react';
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
    overflow-x: auto;
`;

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
    children,
    showHelp = true,
    saveCallback
}) => (
    <MainContainer>
        <Header showHelp={showHelp} saveCallback={saveCallback} />
        <Main>{children}</Main>
    </MainContainer>
);

import styled, { ThemeProvider } from 'styled-components';
import React, { FC } from 'react';
import { Header } from './Header';
import { DARK_THEME, LIGHT_THEME } from '@shared/theme';
import { useMediaQuery } from '@react-hook/media-query';

interface LayoutProps {
    showHelp?: boolean;
    saveCallback?: () => void;
}

const MainContainer = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.gray.normal};
    color: ${({ theme }) => theme.gray.font.normal};
`;

const Main = styled.main`
    width: 100%;
    flex-grow: 1;
    display: flex;
    overflow-x: auto;
`;

export const Layout: FC<LayoutProps> = ({
    children,
    showHelp = true,
    saveCallback
}) => {
    const darkTheme = useMediaQuery('(prefers-color-scheme: dark)');

    return (
        <ThemeProvider theme={darkTheme ? DARK_THEME : LIGHT_THEME}>
            <MainContainer>
                <Header showHelp={showHelp} saveCallback={saveCallback} />
                <Main>{children}</Main>
            </MainContainer>
        </ThemeProvider>
    );
};

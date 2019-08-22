import React, { FC } from 'react';
import styled from '@emotion/styled';

const MainHeader = styled.header`
    padding: 6px 15px;
    height: 45px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    font-family: 'Open Sans', Arial, sans-serif;
    transition: all 0.5s;
    transition-timing-function: ease-out;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const SiteTitle = styled.h1`
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 130%;
    line-height: 1.8;
    box-sizing: border-box;
    display: inline-block;
`;

const HelpText = styled.span`
    padding: 4px 0;
    color: #555;
    line-height: 1.7;
`;

const SiteLink = styled.a`
    color: #0059d1;
    text-decoration: none;

    :hover,
    :focus {
        color: #003884;
        text-decoration: underline;
    }
`;

interface HeaderProps {
    showHelp: boolean;
}

export const Header: FC<HeaderProps> = ({ showHelp }) => (
    <MainHeader>
        <SiteTitle>
            <SiteLink href="/">Pastebin</SiteLink>
        </SiteTitle>
        {showHelp && <HelpText>ctrl + s to save</HelpText>}
    </MainHeader>
);

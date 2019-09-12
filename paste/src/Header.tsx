import React, { FC } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';

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
    padding: 4px 0.3rem;
    color: #555;
    line-height: 1.7;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #eee;
    transition: background-color 0.1s ease-in-out;
    cursor: pointer;

    :hover {
        background-color: #eee;
    }
`;

const SiteLink = styled.a`
    color: #0059d1;
    text-decoration: none;
    cursor: pointer;
    user-select: none;

    :hover,
    :focus {
        color: #003884;
        text-decoration: underline;
    }
`;

interface HeaderProps {
    showHelp: boolean;
    saveCallback?: () => void;
}

export const Header: FC<HeaderProps> = ({ showHelp, saveCallback }) => (
    <MainHeader>
        <SiteTitle>
            <Link href="/" as="/" passHref><SiteLink>Pastebin</SiteLink></Link>
        </SiteTitle>
        {showHelp && <HelpText onClick={saveCallback}>ctrl + s to save</HelpText>}
    </MainHeader>
);

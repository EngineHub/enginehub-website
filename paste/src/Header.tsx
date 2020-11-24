import React, { FC } from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import { LabelledSponsorsArea } from '@shared/components/Sponsors';

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
    flex: 33%;
    flex-grow: 0;
    flex-shrink: 0;
`;

const ButtonStyle = css`
    padding: 4px 0.3rem;
    color: #555;
    line-height: 1.7;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #eee;
    transition: background-color 0.1s ease-in-out;
    cursor: pointer;
    text-decoration: none;

    :hover {
        background-color: #eee;
    }
`;

const ButtonArea = styled.div`
    flex: 33%;
    flex-grow: 0;
    flex-shrink: 0;
    display: flex;
    justify-content: flex-end;

    * {
        margin: 0 4px;
    }
`;

const Button = styled.span`
    ${ButtonStyle}
`;

const ButtonLink = styled.a`
    ${ButtonStyle}
    display: none;

    @media (min-width: 768px) {
        display: block;
    }
`;

const FloatedSponsor = styled(LabelledSponsorsArea)`
    flex: 0;
    flex-grow: 0;
    flex-shrink: 0;
    display: none;
    justify-content: center;

    @media (min-width: 768px) {
        flex: 33%;
        display: flex;
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
            <Link href="/" passHref={true}>
                <SiteLink>Pastebin</SiteLink>
            </Link>
        </SiteTitle>
        <FloatedSponsor />
        <ButtonArea>
            <ButtonLink href="https://github.com/sponsors/EngineHub">
                Support Us
            </ButtonLink>
            {showHelp && (
                <Button onClick={saveCallback}>ctrl + s to save</Button>
            )}
        </ButtonArea>
    </MainHeader>
);

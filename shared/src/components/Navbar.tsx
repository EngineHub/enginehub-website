import { styled } from 'styled-components';
import { Container } from './Container';
import { MainButtonStyle, PurpleButtonStyle } from './Button';
import { SECONDARY, BRAND } from '../theme/index';
import Link from 'next/link';
import type { FC, PropsWithChildren } from 'react';

const NavBackgroundColours = {
    default: SECONDARY.darker,
    inverted: '0',
    purple: BRAND.darker
};

const HeaderTextColors = {
    default: SECONDARY.font,
    inverted: BRAND.font,
    purple: BRAND.font
};

interface NavbarProps {
    discordOverride?: string;
    headertheme?: 'default' | 'inverted' | 'purple';
    headertitle?: string;
    showSponsor?: boolean;
}

const Nav = styled.nav<InvertedProps>`
    position: relative;
    min-height: 50px;
    margin: 0;
    background: ${props => NavBackgroundColours[props.headertheme]};
    border: 0;
    border-radius: 0;
`;

type InvertedProps = {
    headertheme: 'default' | 'inverted' | 'purple';
};

const HeaderLink = styled(Link)<InvertedProps>`
    color: ${props => HeaderTextColors[props.headertheme]};
    font-size: 18px;
    line-height: 23px;
    text-decoration: none;
    padding: 13.5px 15px;
    height: 50px;
    float: left;
    cursor: pointer;
`;

const FloatedPurpleButton = styled.a`
    ${PurpleButtonStyle()};
    float: right;

    display: none;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    @media (min-width: 470px) {
        display: block;
    }
`;

const FloatedGrayButton = styled.a`
    ${MainButtonStyle()};
    float: right;

    display: none;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    @media (min-width: 470px) {
        display: block;
    }
`;

export const Navbar: FC<PropsWithChildren<NavbarProps>> = ({
    headertheme = 'default',
    headertitle = 'EngineHub',
    discordOverride,
    showSponsor = true,
    children
}) => {
    const ButtonComp =
        headertheme !== 'default' ? FloatedPurpleButton : FloatedGrayButton;
    return (
        <Nav headertheme={headertheme}>
            <Container>
                <div>
                    <HeaderLink href="/" headertheme={headertheme}>
                        {headertitle}
                    </HeaderLink>
                </div>
                {showSponsor && (
                    <div>
                        <ButtonComp href="https://github.com/sponsors/EngineHub">
                            Support Us
                        </ButtonComp>
                    </div>
                )}
                <div>
                    <ButtonComp
                        href={
                            discordOverride
                                ? discordOverride
                                : 'https://discord.gg/enginehub'
                        }
                    >
                        Ask questions on Discord
                    </ButtonComp>
                </div>
                {children}
            </Container>
        </Nav>
    );
};

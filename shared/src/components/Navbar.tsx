import React, { useContext } from 'react';
import styled from 'styled-components';
import { Container } from '@shared/components/Container';
import { LinkProviderContext } from '@shared/utils/LinkProvider';
import { MainButtonStyle, PurpleButtonStyle } from '@shared/components/Button';
import { SECONDARY, BRAND } from '@shared/theme';

const NavBackgroundColours = new Map([
    ['default', SECONDARY.darker],
    ['inverted', '0'],
    ['purple', BRAND.darker]
]);

const HeaderTextColors = new Map([
    ['default', SECONDARY.font],
    ['inverted', BRAND.font],
    ['purple', BRAND.font]
]);

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
    background: ${props => NavBackgroundColours.get(props.headertheme)!};
    border: 0;
    border-radius: 0;
`;

type InvertedProps = {
    headertheme: 'default' | 'inverted' | 'purple';
};

const HeaderLink = styled.a<InvertedProps>`
    color: ${props => HeaderTextColors.get(props.headertheme)!};
    font-size: 18px;
    line-height: 23px;
    text-decoration: none;
    padding: 13.5px 15px;
    height: 50px;
    float: left;
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

const Navbar: React.FC<NavbarProps> = ({
    headertheme = 'default',
    headertitle = 'EngineHub',
    discordOverride,
    showSponsor = true,
    children
}) => {
    const Link = useContext(LinkProviderContext);

    const ButtonComp =
        headertheme !== 'default' ? FloatedPurpleButton : FloatedGrayButton;
    return (
        <Nav headertheme={headertheme}>
            <Container>
                <div>
                    <HeaderLink href="/" headertheme={headertheme} as={Link}>
                        {headertitle}
                    </HeaderLink>
                </div>
                {showSponsor && (
                    <div>
                        <ButtonComp
                            href="https://github.com/sponsors/EngineHub"
                            as={Link}
                        >
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
                        as={Link}
                    >
                        Ask questions on Discord
                    </ButtonComp>
                </div>
                {children}
            </Container>
        </Nav>
    );
};

export default Navbar;

import React from 'react';
import styled from '@emotion/styled';
import { Container } from '@shared/components/Container';
import css from '@emotion/css';
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

const HeaderLinkStyle = (props: InvertedProps) => css`
    color: ${HeaderTextColors.get(props.headertheme)!};
    font-size: 18px;
    line-height: 23px;
    text-decoration: none;
    padding: 13.5px 15px;
    height: 50px;
    float: left;
`;

const FloatedPurpleButton = () => css`
    ${PurpleButtonStyle()};
    float: right;

    display: none;
    margin-left: 0.25rem;
    margin-right: 0.25rem;

    @media (min-width: 470px) {
        display: block;
    }
`;

const FloatedGrayButton = () => css`
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
    return (
        <LinkProviderContext.Consumer>
            {linkProvider => {
                const Link = linkProvider.getLinkComponent();
                const HeaderLink = styled(Link)<InvertedProps>(HeaderLinkStyle);
                const ButtonComp =
                    headertheme !== 'default'
                        ? styled(Link)(FloatedPurpleButton)
                        : styled(Link)(FloatedGrayButton);
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
            }}
        </LinkProviderContext.Consumer>
    );
};

export default Navbar;

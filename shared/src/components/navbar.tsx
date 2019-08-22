import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Container } from '@shared/components/container';
import css from '@emotion/css';
import { LinkProviderContext } from '@shared/utils/link-provider';
import { MainButtonStyle, PurpleButtonStyle } from '@shared/components/button';

const NavBackgroundColours = new Map([
    ['default', '#f8f8f8'],
    ['inverted', '0'],
    ['purple', '#4d3672']
]);

const HeaderTextColors = new Map([
    ['default', '#777777'],
    ['inverted', '#fff'],
    ['purple', '#fff']
]);

interface NavbarProps {
    discordOverride?: string;
    headerTheme?: 'default' | 'inverted' | 'purple';
}

const Nav = styled.nav<InvertedProps>`
    position: relative;
    min-height: 50px;
    margin: 0;
    background: ${props => NavBackgroundColours.get(props.headerTheme)!};
    border: 0;
    border-radius: 0;
`;

type InvertedProps = {
    headerTheme: 'default' | 'inverted' | 'purple';
};

const HeaderLinkStyle = (props: InvertedProps) => css`
    color: ${HeaderTextColors.get(props.headerTheme)!};
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

    @media (min-width: 410px) {
        display: block;
    }
`;

const FloatedGrayButton = () => css`
    ${MainButtonStyle()};
    float: right;

    display: none;

    @media (min-width: 410px) {
        display: block;
    }
`;

const Navbar: FunctionComponent<NavbarProps> = ({
    headerTheme = 'default',
    discordOverride
}) => {
    return (
        <LinkProviderContext.Consumer>
            {linkProvider => {
                const Link = linkProvider.getLinkComponent();
                const OutboundLink = linkProvider.getOutboundLinkComponent();
                const HeaderLink = styled(Link)<InvertedProps>(HeaderLinkStyle);
                const ButtonComp =
                    headerTheme !== 'default'
                        ? styled(OutboundLink)(FloatedPurpleButton)
                        : styled(OutboundLink)(FloatedGrayButton);
                return (
                    <Nav headerTheme={headerTheme}>
                        <Container>
                            <div>
                                <HeaderLink href="/" headerTheme={headerTheme}>
                                    EngineHub.org
                                </HeaderLink>
                            </div>
                            <div>
                                <ButtonComp
                                    href={
                                        discordOverride
                                            ? discordOverride
                                            : 'https://discord.gg/enginehub'
                                    }
                                >
                                    Ask questions on our Discord
                                </ButtonComp>
                            </div>
                        </Container>
                    </Nav>
                );
            }}
        </LinkProviderContext.Consumer>
    );
};

export default Navbar;

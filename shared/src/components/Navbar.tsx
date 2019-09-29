import React from 'react';
import styled from '@emotion/styled';
import { Container } from '@shared/components/Container';
import css from '@emotion/css';
import { LinkProviderContext } from '@shared/utils/LinkProvider';
import { MainButtonStyle, PurpleButtonStyle } from '@shared/components/Button';

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
    headertheme?: 'default' | 'inverted' | 'purple';
    headertitle?: string;
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

const Navbar: React.FC<NavbarProps> = ({
    headertheme = 'default',
    headertitle = 'EngineHub.org',
    discordOverride,
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
                            {children}
                        </Container>
                    </Nav>
                );
            }}
        </LinkProviderContext.Consumer>
    );
};

export default Navbar;

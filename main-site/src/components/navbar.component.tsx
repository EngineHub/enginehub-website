import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Container } from './container.component';
import { GrayOutboundButton, PurpleOutboundButton } from './button.component';

interface NavbarProps {
    discordOverride?: string;
    inverted?: boolean;
}

const Nav = styled.nav<InvertedProps>`
    position: relative;
    min-height: 50px;
    margin: 0;
    background: ${props => (props.inverted ? `0` : `#f8f8f8`)};
    border: 0;
    border-radius: 0;
`;

type InvertedProps = {
    inverted: boolean;
};

const HeaderLink = styled(Link)<InvertedProps>`
    color: ${props => (props.inverted ? `#fff` : `#777777`)};
    font-size: 18px;
    line-height: 23px;
    text-decoration: none;
    padding: 13.5px 15px;
    height: 50px;
    float: left;
`;

const FloatedPurpleButton = styled(PurpleOutboundButton)`
    float: right;

    display: none;

    @media(min-width: 410px) {
        display: block;
    }
`;

const FloatedGrayButton = styled(GrayOutboundButton)`
    float: right;

    display: none;

    @media(min-width: 410px) {
        display: block;
    }
`;

const Navbar: FunctionComponent<NavbarProps> = ({ inverted = false, discordOverride }) => {
    const ButtonComp = inverted ? FloatedPurpleButton : FloatedGrayButton;
    return (
        <Nav inverted={inverted}>
            <Container>
                <div>
                    <HeaderLink to="/" inverted={inverted}>
                        EngineHub.org
                    </HeaderLink>
                </div>
                <div>
                    <ButtonComp
                        inverted={inverted}
                        href={discordOverride ? discordOverride : 'https://discord.gg/enginehub'}
                    >
                        Ask questions on our Discord
                    </ButtonComp>
                </div>
            </Container>
        </Nav>
    );
};

export default Navbar;

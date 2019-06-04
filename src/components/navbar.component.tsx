import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Container } from './container.component';
import { OutboundLink } from 'gatsby-plugin-gtag';

interface NavbarProps {
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

const DiscordButton = styled(OutboundLink)<InvertedProps>`
    border: ${props =>
        props.inverted ? `1px solid #412e61` : `1px solid #ccc`};
    color: ${props => (props.inverted ? `#fff` : `#333`)};
    text-shadow: ${props =>
        props.inverted ? `0 1px rgba(0,0,0,.1)` : `0 1px 0 #fff`};
    font-weight: 700;
    cursor: pointer;
    margin-top: 6.5px;
    margin-bottom: 6.5px;
    float: right;
    background-image: ${props =>
        props.inverted
            ? `linear-gradient(to bottom,#4d3672 0,#412e61 100%)`
            : `linear-gradient(to bottom,#f5f5f5 0,#f1f1f1 100%)`};
    text-align: center;
    vertical-align: middle;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.7;
    border-radius: 4px;
    text-decoration: none;
    box-shadow: ${props =>
        props.inverted ? `none` : `0 1px 1px rgba(0,0,0,.1)`};

    :hover {
        border: ${props =>
            props.inverted ? `1px solid #36264f` : `1px solid #c6c6c6`};
        background-image: ${props =>
            props.inverted
                ? `linear-gradient(to bottom,#4d3672 0,#36264f 100%)`
                : `linear-gradient(to bottom,#f8f8f8 0,#f1f1f1 100%)`};
    }
`;

const Navbar: FunctionComponent<NavbarProps> = ({ inverted = false }) => (
    <Nav inverted={inverted}>
        <Container>
            <div>
                <HeaderLink to="/" inverted={inverted}>
                    EngineHub.org
                </HeaderLink>
            </div>
            <div>
                <DiscordButton
                    inverted={inverted}
                    href={'https://discord.gg/enginehub'}
                >
                    Ask questions on our Discord
                </DiscordButton>
            </div>
        </Container>
    </Nav>
);

export default Navbar;

import { Link } from 'gatsby';
import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { Container } from './container.component';

interface NavbarProps {
    inverted?: boolean;
}

const Nav = styled.nav`
    position: relative;
    min-height: 50px;
    margin: 0;
    background: 0;
    border: 0;
    border-radius: 0;
`;

type InvertedProps = {
    inverted: boolean;
}

const HeaderLink = styled(Link)<InvertedProps>`
    color: ${props => props.inverted ? `#fff` : `#777777`};
    font-size: 18px;
    line-height: 23px;
    text-decoration: none;
`;

const Navbar: FunctionComponent<NavbarProps> = ({ inverted = false }) => (
    <Nav>
        <Container>
            <div>
                <HeaderLink to="/" inverted={inverted}>EngineHub.org</HeaderLink>
            </div>
        </Container>
    </Nav>
);

export default Navbar;

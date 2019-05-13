import { StaticQuery, Link, graphql } from 'gatsby';
import React, { FunctionComponent } from 'react';

interface HeaderProps {
    inverted?: boolean;
}

const Header: FunctionComponent<HeaderProps> = ({ inverted = true }) => (
    <header>
        <div>
            <h1>
                <Link to="/">EngineHub.org</Link>
            </h1>
        </div>
    </header>
);

export default Header;

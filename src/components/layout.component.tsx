/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { FunctionComponent } from 'react';

import Header from './header';
import './layout.css';
import Footer from './footer.component';

interface LayoutProps {}

// tslint:disable: jsx-no-lambda
const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
    <>
        <Header />
        <main>{children}</main>
        <Footer />
    </>
);

export default Layout;

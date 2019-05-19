import React, { FunctionComponent } from 'react';

import Navbar from './navbar.component';
import './layout.css';
import Footer from './footer.component';
import { Landing } from './landing.component';

interface LayoutProps {
    landing?: boolean;
}

// tslint:disable: jsx-no-lambda
const Layout: FunctionComponent<LayoutProps> = ({
    children,
    landing = false,
}) => (
    <>
        {landing ? <Landing /> : <Navbar />}
        <main>{children}</main>
        <Footer />
    </>
);

export default Layout;

import React, { FunctionComponent, useEffect } from 'react';

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
}) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('smooth-scroll')('a[href*="#"]');
        }
    }, []);
    return (
        <>
            {landing ? <Landing /> : <Navbar />}
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;

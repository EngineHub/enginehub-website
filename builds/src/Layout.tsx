import React from 'react';
import { Navbar, Footer, ExtraSponsorProps } from '@enginehub/shared';

const Layout: React.FC<ExtraSponsorProps> = ({ children, extraSponsors }) => {
    return (
        <>
            <Navbar headertheme="purple" />
            <main>{children}</main>
            <Footer mainSite={false} extraSponsors={extraSponsors} />
        </>
    );
};

export default Layout;

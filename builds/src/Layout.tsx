import React, { FC, PropsWithChildren } from 'react';
import { Navbar, Footer, ExtraSponsorProps } from '@enginehub/shared';

const Layout: FC<PropsWithChildren<ExtraSponsorProps>> = ({
    children,
    extraSponsors
}) => {
    return (
        <>
            <Navbar headertheme="purple" />
            <main>{children}</main>
            <Footer mainSite={false} extraSponsors={extraSponsors} />
        </>
    );
};

export default Layout;

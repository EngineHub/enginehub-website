import type { FC, PropsWithChildren } from 'react';
import type { ExtraSponsorProps } from '@enginehub/shared';
import { Navbar, Footer } from '@enginehub/shared';

const Layout: FC<PropsWithChildren<ExtraSponsorProps>> = ({
    children,
    extraSponsors
}) => {
    return (
        <>
            <Navbar headertheme="purple" />
            <main>{children}</main>
            <Footer extraSponsors={extraSponsors} />
        </>
    );
};

export default Layout;

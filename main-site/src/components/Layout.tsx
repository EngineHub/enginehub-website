import React, { FunctionComponent, PropsWithChildren, useEffect } from 'react';
import { Navbar, Footer, ExtraSponsorProps } from '@enginehub/shared';
import { Landing } from './Landing';
import Head from 'next/head';

interface LayoutProps extends ExtraSponsorProps {
    discordOverride?: string;
    landing?: boolean;
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({
    children,
    landing = false,
    discordOverride,
    extraSponsors = []
}) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('smooth-scroll')('a[href*="#"]');
        }
    }, []);
    return (
        <>
            <Head>
                <link
                    rel="preload"
                    as="font"
                    type="font/woff2"
                    crossOrigin="true"
                    href="/fonts/open-sans-v16-latin-regular.woff2"
                />
                <link
                    rel="preload"
                    as="font"
                    type="font/woff2"
                    crossOrigin="true"
                    href="/fonts/open-sans-v16-latin-600.woff2"
                />
            </Head>
            {landing ? (
                <Landing discordOverride={discordOverride} />
            ) : (
                <Navbar discordOverride={discordOverride} />
            )}
            <main>{children}</main>
            <Footer mainSite={true} extraSponsors={extraSponsors} />
        </>
    );
};

export default Layout;

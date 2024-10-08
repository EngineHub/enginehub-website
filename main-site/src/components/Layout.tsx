import Head from 'next/head';
import type { FunctionComponent, PropsWithChildren } from 'react';
import { useEffect } from 'react';

import type { ExtraSponsorProps } from '@enginehub/shared';
import { Footer, Navbar } from '@enginehub/shared';

import { Landing } from './Landing';

interface LayoutProps extends ExtraSponsorProps {
    discordOverride?: string;
    landing?: boolean;
}

const Layout: FunctionComponent<PropsWithChildren<LayoutProps>> = ({
    children,
    landing = false,
    discordOverride,
    extraSponsors
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
                    crossOrigin="anonymous"
                    href="/fonts/open-sans-v16-latin-regular.woff2"
                />
                <link
                    rel="preload"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                    href="/fonts/open-sans-v16-latin-600.woff2"
                />
            </Head>
            {landing ? (
                <Landing discordOverride={discordOverride} />
            ) : (
                <Navbar discordOverride={discordOverride} />
            )}
            <main>{children}</main>
            <Footer extraSponsors={extraSponsors} />
        </>
    );
};

export default Layout;

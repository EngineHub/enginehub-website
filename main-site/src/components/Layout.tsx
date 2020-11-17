import React, { FunctionComponent, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@shared/components/Navbar';
import './layout.css';
import Footer from '@shared/components/Footer';
import { Landing } from './Landing';
import {
    WrapperLinkProps,
    LinkProviderContext
} from '@shared/utils/LinkProvider';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import { ExtraSponsorProps } from '@shared/components/Sponsors';

interface LayoutProps {
    discordOverride?: string;
    landing?: boolean;
}

const GatsbyLink: React.FC<WrapperLinkProps> = ({
    href,
    children,
    ...props
}) => {
    if (
        !href.startsWith('https://enginehub.org/') &&
        (!href.startsWith('/') || href.startsWith('//'))
    ) {
        return (
            <OutboundLink href={href} {...props}>
                {children}
            </OutboundLink>
        );
    }
    if (href.startsWith('https://enginehub.org/')) {
        href = href.substring('https://enginehub.org'.length);
    }
    return (
        <Link to={href} {...props}>
            {children}
        </Link>
    );
};

const Layout: FunctionComponent<LayoutProps & ExtraSponsorProps> = ({
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
        <LinkProviderContext.Provider value={GatsbyLink}>
            <Helmet
                link={[
                    {
                        rel: 'preload',
                        as: 'font',
                        type: 'font/woff2',
                        crossOrigin: 'true',
                        href: '/fonts/open-sans-v16-latin-600.woff2'
                    },
                    {
                        rel: 'preload',
                        as: 'font',
                        type: 'font/woff2',
                        crossOrigin: 'true',
                        href: '/fonts/open-sans-v16-latin-regular.woff2'
                    }
                ]}
            />
            {landing ? (
                <Landing discordOverride={discordOverride} />
            ) : (
                <Navbar discordOverride={discordOverride} />
            )}
            <main>{children}</main>
            <Footer
                mainSite={true}
                extraSponsors={['netlify'].concat(extraSponsors)}
            />
        </LinkProviderContext.Provider>
    );
};

export default Layout;

import React, { FunctionComponent, useEffect, useMemo } from 'react';
import Helmet from 'react-helmet';
import Navbar from '@shared/components/navbar';
import './layout.css';
import Footer from '@shared/components/footer';
import { Landing } from './landing';
import { LinkProvider, WrapperLinkProps } from '@shared/utils/link-provider';
import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';

interface LayoutProps {
    discordOverride?: string;
    landing?: boolean;
}

class GatsbyLinkProvider implements LinkProvider {
    getLinkComponent(): FunctionComponent<WrapperLinkProps> {
        return ({ href, children, ...props }) =>
            useMemo(
                () => (
                    <Link to={href} {...props}>
                        {children}
                    </Link>
                ),
                [href, children, props]
            );
    }

    getOutboundLinkComponent(): FunctionComponent<WrapperLinkProps> {
        return ({ href, children, ...props }) =>
            useMemo(
                () => (
                    <OutboundLink href={href} {...props}>
                        {children}
                    </OutboundLink>
                ),
                [href, children, props]
            );
    }
}

const Layout: FunctionComponent<LayoutProps> = ({
    children,
    landing = false,
    discordOverride
}) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('smooth-scroll')('a[href*="#"]');
        }
    }, []);
    const linkProvider = useMemo(() => new GatsbyLinkProvider(), []);
    return (
        <>
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
                <Landing
                    discordOverride={discordOverride}
                    linkProvider={linkProvider}
                />
            ) : (
                <Navbar
                    discordOverride={discordOverride}
                    linkProvider={linkProvider}
                />
            )}
            <main>{children}</main>
            <Footer linkProvider={linkProvider} />
        </>
    );
};

export default Layout;

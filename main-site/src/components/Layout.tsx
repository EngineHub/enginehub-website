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
import styled, { ThemeProvider } from 'styled-components';
import { LIGHT_THEME } from '@shared/theme';

interface LayoutProps {
    discordOverride?: string;
    landing?: boolean;
}

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.gray.normal};
    color: ${({ theme }) => theme.gray.font.normal};
`;

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
        <ThemeProvider theme={LIGHT_THEME}>
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
                <Wrapper>
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
                </Wrapper>
            </LinkProviderContext.Provider>
        </ThemeProvider>
    );
};

export default Layout;

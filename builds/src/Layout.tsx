import React from 'react';
import {
    LinkProviderContext,
    WrapperLinkProps
} from '@shared/utils/LinkProvider';
import Navbar from '@shared/components/Navbar';
import Footer from '@shared/components/Footer';
import { ExtraSponsorProps } from '@shared/components/Sponsors';
import Link from 'next/link';
import styled, { ThemeProvider } from 'styled-components';
import { DARK_THEME } from '@shared/theme';

const NextLink: React.FC<WrapperLinkProps> = ({ href, children, ...props }) => {
    if (
        !href.startsWith('https://builds.enginehub.org') &&
        (!href.startsWith('/') || href.startsWith('//'))
    ) {
        return (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }
    if (href.startsWith('https://builds.enginehub.org')) {
        href = href.substring('https://builds.enginehub.org'.length);
    }
    return (
        <Link href={href} passHref={true}>
            <a {...props}>{children}</a>
        </Link>
    );
};

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.gray.normal};
    color: ${({ theme }) => theme.gray.font.normal};
`;

const Layout: React.FC<ExtraSponsorProps> = ({ children, extraSponsors }) => {
    return (
        <ThemeProvider theme={DARK_THEME}>
            <LinkProviderContext.Provider value={NextLink}>
                <Wrapper>
                    <Navbar headertheme="purple" />
                    <main>{children}</main>
                    <Footer mainSite={false} extraSponsors={extraSponsors} />
                </Wrapper>
            </LinkProviderContext.Provider>
        </ThemeProvider>
    );
};

export default Layout;

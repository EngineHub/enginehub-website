import React from 'react';
import {
    LinkProviderContext,
    WrapperLinkProps,
    Navbar,
    Footer,
    ExtraSponsorProps
} from '@enginehub/shared';
import Link from 'next/link';

const NextLink: React.FC<WrapperLinkProps> = ({
    href,
    children,
    ...props
}) => {
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

const Layout: React.FC<ExtraSponsorProps> = ({ children, extraSponsors }) => {
    return (
        <LinkProviderContext.Provider value={NextLink}>
            <Navbar headertheme="purple" />
            <main>{children}</main>
            <Footer mainSite={false} extraSponsors={extraSponsors} />
        </LinkProviderContext.Provider>
    );
};

export default Layout;

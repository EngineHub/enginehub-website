import React, { useMemo } from 'react';
import {
    LinkProvider,
    LinkProviderContext,
    WrapperLink
} from '@shared/utils/link-provider';
import { Link } from '@reach/router';
import Navbar from '@shared/components/navbar';
import Footer from '@shared/components/footer';
import './layout.css';
import { ExtraSponsorProps } from '@shared/components/sponsors';

class NextLinkProvider implements LinkProvider {
    getLinkComponent(): WrapperLink {
        return ({ href, children, ...props }) => (
            <Link to={href} {...props}>
                {children}
            </Link>
        );
    }

    getOutboundLinkComponent(): WrapperLink {
        return ({ href, children, ...props }) => (
            <a href={href} {...props}>
                {children}
            </a>
        );
    }
}

const Layout: React.FC<ExtraSponsorProps> = ({ children, extraSponsors }) => {
    const linkProvider = useMemo(() => new NextLinkProvider(), []);
    return (
        <LinkProviderContext.Provider value={linkProvider}>
            <Navbar headerTheme="purple" />
            <main>{children}</main>
            <Footer mainSite={false} extraSponsors={extraSponsors} />
        </LinkProviderContext.Provider>
    );
};

export default Layout;

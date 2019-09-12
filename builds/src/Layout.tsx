import React, { useMemo } from 'react';
import {
    LinkProvider,
    LinkProviderContext,
    WrapperLink
} from '@shared/utils/LinkProvider';
import Navbar from '@shared/components/Navbar';
import Footer from '@shared/components/Footer';
import './layout.css';
import { ExtraSponsorProps } from '@shared/components/Sponsors';

class NextLinkProvider implements LinkProvider {
    getLinkComponent(): WrapperLink {
        return ({ href, children, ...props }) => (
            <a href={href} {...props}>
                {children}
            </a>
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
            <Navbar headertheme="purple" />
            <main>{children}</main>
            <Footer mainSite={false} extraSponsors={extraSponsors} />
        </LinkProviderContext.Provider>
    );
};

export default Layout;

import React, { useMemo } from 'react';
import {
    AnchorLinkProvider,
    LinkProviderContext,
    WrapperLink
} from '@shared/utils/LinkProvider';
import Navbar from '@shared/components/Navbar';
import Footer from '@shared/components/Footer';
import './layout.css';
import { ExtraSponsorProps } from '@shared/components/Sponsors';
import Link from 'next/link';

class NextLinkProvider extends AnchorLinkProvider {
    getLinkComponent(): WrapperLink {
        return ({ href, children, as, ...props }) => {
            if (
                !href.startsWith('https://builds.enginehub.org') &&
                (!href.startsWith('/') || href.startsWith('//'))
            ) {
                return super.getLinkComponent()({ href, children, ...props });
            }
            if (href.startsWith('https://builds.enginehub.org')) {
                href = href.substring('https://builds.enginehub.org'.length);
            }
            return (
                <Link href={href} as={as} passHref={true}>
                    <a {...props}>{children}</a>
                </Link>
            );
        };
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

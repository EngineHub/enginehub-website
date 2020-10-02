import React, { useMemo } from 'react';
import {
    LinkProviderContext,
    WrapperLink,
    AnchorLinkProvider
} from '@shared/utils/LinkProvider';
import Navbar from '@shared/components/Navbar';
import Footer from '@shared/components/Footer';
import { ExtraSponsorProps } from '@shared/components/Sponsors';
import { useIsLoggedIn, useSetToken, AuthProvider } from './components/Auth';
import { PurpleButtonStyle } from '@shared/components/Button';
import styled from '@emotion/styled';
import Link from 'next/link';

class NextLinkProvider extends AnchorLinkProvider {
    getLinkComponent(): WrapperLink {
        return ({ href, children, as, ...props }) => {
            if (
                !href.startsWith('https://worldedit.golf/') &&
                (!href.startsWith('/') || href.startsWith('//'))
            ) {
                return super.getLinkComponent()({ href, children, ...props });
            }
            if (href.startsWith('https://worldedit.golf/')) {
                href = href.substring('https://worldedit.golf/'.length);
            }
            return (
                <Link href={as ? as : href} as={href} passHref={true}>
                    <a {...props}>{children}</a>
                </Link>
            );
        };
    }
}

const FloatedPurpleButton = styled.a`
    ${PurpleButtonStyle()};
    float: right;
    margin-right: 0.5rem;

    display: none;

    @media (min-width: 410px) {
        display: block;
    }
`;

const LayoutInner: React.FC<ExtraSponsorProps> = ({
    children,
    extraSponsors
}) => {
    const linkProvider = useMemo(() => new NextLinkProvider(), []);

    const isAuthenticated = useIsLoggedIn();
    const setToken = useSetToken();
    const onLogOut = () => setToken(undefined);

    return (
        <LinkProviderContext.Provider value={linkProvider}>
            <Navbar headertheme="purple" headertitle="WorldEdit.golf">
                <div>
                    {isAuthenticated ? (
                        <FloatedPurpleButton key="logout" onClick={onLogOut}>
                            Log out
                        </FloatedPurpleButton>
                    ) : (
                        <FloatedPurpleButton
                            key="login"
                            href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`}
                        >
                            Log in
                        </FloatedPurpleButton>
                    )}
                </div>
            </Navbar>
            <main>{children}</main>
            <Footer mainSite={false} extraSponsors={extraSponsors} />
        </LinkProviderContext.Provider>
    );
};

export const Layout: React.FC<ExtraSponsorProps> = ({ children, ...rest }) => {
    return (
        <AuthProvider>
            <LayoutInner {...rest}>{children}</LayoutInner>
        </AuthProvider>
    );
};

export default Layout;

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
import { useIsLoggedIn, useSetToken, AuthProvider } from './components/Auth';
import { PurpleButtonStyle } from '@shared/components/Button';
import styled from '@emotion/styled';

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

const isServerRendered = typeof window === 'undefined';

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
            <Navbar headertheme="purple">
                {!isAuthenticated && (
                    <div>
                        <FloatedPurpleButton
                            key="login"
                            href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`}
                        >
                            Log in
                        </FloatedPurpleButton>
                    </div>
                )}
                {isAuthenticated && !isServerRendered && (
                    <div>
                        <FloatedPurpleButton key="logout" onClick={onLogOut}>
                            Log out
                        </FloatedPurpleButton>
                    </div>
                )}
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

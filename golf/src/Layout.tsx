import React from 'react';
import {
    Navbar,
    Footer,
    ExtraSponsorProps,
    PurpleButtonStyle
} from '@enginehub/shared';
import { useIsLoggedIn, useSetToken, AuthProvider } from './components/Auth';
import styled from 'styled-components';

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
    const isAuthenticated = useIsLoggedIn();
    const setToken = useSetToken();
    const onLogOut = () => setToken(undefined);

    return (
        <>
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
        </>
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

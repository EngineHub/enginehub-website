import type { FC, PropsWithChildren } from 'react';
import type { ExtraSponsorProps } from '@enginehub/shared';
import { Navbar, Footer, PurpleButtonStyle } from '@enginehub/shared';
import { useIsLoggedIn, useSetToken, AuthProvider } from './components/Auth';
import { styled } from 'styled-components';

const FloatedPurpleButton = styled.a`
    ${PurpleButtonStyle()};
    float: right;
    margin-right: 0.5rem;

    display: none;

    @media (min-width: 410px) {
        display: block;
    }
`;

const LayoutInner: FC<PropsWithChildren<ExtraSponsorProps>> = ({
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
                            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                            href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`}
                        >
                            Log in
                        </FloatedPurpleButton>
                    )}
                </div>
            </Navbar>
            <main>{children}</main>
            <Footer extraSponsors={extraSponsors} />
        </>
    );
};

export const Layout: FC<PropsWithChildren<ExtraSponsorProps>> = ({
    children,
    ...rest
}) => {
    return (
        <AuthProvider>
            <LayoutInner {...rest}>{children}</LayoutInner>
        </AuthProvider>
    );
};

export default Layout;

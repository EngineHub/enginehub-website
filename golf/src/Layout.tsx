import type { FC, PropsWithChildren } from 'react';

import type { ExtraSponsorProps } from '@enginehub/shared';
import { BrandButton, Button, Footer, Navbar } from '@enginehub/shared';

import { AuthProvider, useIsLoggedIn, useSetToken } from './components/Auth';
import { FloatedButton } from './Layout.module.css';

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
                        <a
                            className={`${Button} ${BrandButton} ${FloatedButton}`}
                            key="logout"
                            onClick={onLogOut}
                        >
                            Log out
                        </a>
                    ) : (
                        <a
                            className={`${Button} ${BrandButton} ${FloatedButton}`}
                            key="login"
                            href={`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`}
                        >
                            Log in
                        </a>
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

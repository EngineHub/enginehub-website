import React, { useContext, useState, useEffect, useMemo } from 'react';
import router from 'next/router';
import jwt from 'jsonwebtoken';

const getToken = () =>
    typeof window !== 'undefined' ? window.localStorage.getItem('token')! : ' ';

const AuthContext = React.createContext<{
    token: string | undefined;
    setToken: (value?: string) => void;
}>({
    token: getToken(),
    setToken: () => {}
});

export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string | undefined>(getToken());

    useEffect(() => {
        setToken(getToken());
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useSetToken: () => (value?: string) => void = () => {
    const { setToken } = useContext(AuthContext);

    const set = (value?: string) => {
        if (value) {
            window.localStorage.setItem('token', value);
        } else {
            window.localStorage.removeItem('token');
        }

        setToken(value);
    };

    return set;
};

export const useToken: () => string | undefined = () => {
    const { token } = useContext(AuthContext);

    try {
        if (token) {
            const isValid = useMemo(() => {
                const decodedToken = jwt.decode(token);

                return (
                    decodedToken &&
                    decodedToken['exp'] &&
                    decodedToken['exp'] * 1000 > Date.now()
                );
            }, [token]);

            if (!isValid) {
                const setToken = useSetToken();
                setToken(undefined);
                return undefined;
            }
        }
    } catch (e) {}

    return token;
};

type FetchFunction = typeof fetch;

export const useAuthenticatedFetch: () => FetchFunction = () => {
    const token = useToken();

    return (input: RequestInfo, init?: RequestInit) => {
        if (!token) {
            return Promise.reject('Cannot find auth token!');
        }

        init = {
            ...init,
            headers: {
                ...(init || { headers: {} }).headers,
                authorization: `token ${token}`
            }
        };

        return fetch(input, init);
    };
};

export const useIsLoggedIn: () => boolean = () => {
    const { token } = useContext(AuthContext);
    return !!token;
};

export const useAuthenticatedPage = () => {
    const isLoggedIn = useIsLoggedIn();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, [useIsLoggedIn]);
};

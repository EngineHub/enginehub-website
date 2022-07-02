import React, {
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback
} from 'react';
import router from 'next/router';
import jwt from 'jsonwebtoken';

const isServerRendered = typeof window === 'undefined';

const getToken = () =>
    isServerRendered ? ' ' : window.localStorage.getItem('token')!;

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

    const set = useCallback(
        (value?: string) => {
            if (!isServerRendered) {
                if (value) {
                    window.localStorage.setItem('token', value);
                } else {
                    window.localStorage.removeItem('token');
                }
            }

            setToken(value);
        },
        [setToken]
    );

    return set;
};

export const useToken: () => string | undefined = () => {
    const { token } = useContext(AuthContext);
    const setToken = useSetToken();

    const isValid = useMemo(() => {
        if (!token) {
            return false;
        }

        const decodedToken = jwt.decode(token);

        return (
            decodedToken &&
            decodedToken['exp'] &&
            decodedToken['exp'] * 1000 > Date.now()
        );
    }, [token]);

    if (token && !isValid) {
        setToken(undefined);
        return undefined;
    }

    return token;
};

type FetchFunction = typeof fetch;

export const useAuthenticatedFetch: () => FetchFunction = () => {
    const token = useToken();

    return (input: RequestInfo | URL, init?: RequestInit) => {
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
    return !!token && !isServerRendered;
};

export const useAuthenticatedPage = () => {
    const isLoggedIn = useIsLoggedIn();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/');
        }
    }, [isLoggedIn]);
};

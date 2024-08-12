import jwt from 'jsonwebtoken';
import router from 'next/router';
import type { FC, PropsWithChildren } from 'react';
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';

const isServerRendered = typeof window === 'undefined';

const getToken = () =>
    isServerRendered ? ' ' : window.localStorage.getItem('token') || undefined;

const AuthContext = createContext<{
    token: string | undefined;
    setToken: (value?: string) => void;
}>({
    token: getToken(),
    setToken: () => {
        return;
    }
});

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
    const [token, setToken] = useState<string | undefined>(getToken());

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useSetToken: () => (value?: string) => void = () => {
    const { setToken } = useContext(AuthContext);

    return useCallback(
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
            typeof decodedToken === 'object' &&
            decodedToken['exp'] &&
            decodedToken['exp'] * 1000 > Date.now()
        );
    }, [token]);

    if (token && !isValid) {
        setToken(undefined);
        return;
    }

    return token;
};

type FetchFunction = typeof fetch;

export const useAuthenticatedFetch: () => FetchFunction = () => {
    const token = useToken();

    return (input: RequestInfo | URL, init?: RequestInit) => {
        if (!token) {
            // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
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
    const token = useToken();
    return token !== undefined && !isServerRendered;
};

export const useAuthenticatedPage = () => {
    const isLoggedIn = useIsLoggedIn();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/').catch(() => {});
        }
    }, [isLoggedIn]);
};

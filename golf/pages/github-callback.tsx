import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useSetToken } from '../src/components/Auth';
import { Loading } from '../src/components/Loading';
import { SignInLoadingContainer } from '../src/components/Loading.module.css';
import Layout from '../src/Layout';

const Page = () => {
    const [errorMessage, setError] = useState<string>();
    const router = useRouter();
    const setToken = useSetToken();
    const code =
        typeof router.query.code === 'string' ? router.query.code : undefined;

    useEffect(() => {
        if (!router.isReady || !code) {
            return;
        }

        fetch('/api/github-oauth', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ code })
        })
            .then(
                res => res.json() as Promise<{ error?: string; token?: string }>
            )
            .then(({ error, token }) => {
                if (token) {
                    setToken(token);
                    router.push('/').catch(e => setError(e));
                } else if (error) {
                    setError(error);
                } else {
                    setError('An unexpected error occurred');
                }
            })
            .catch(e => setError(e));
    }, [code, router, setToken]);

    const error =
        errorMessage ??
        (router.isReady && !code
            ? 'Could not find code in query params!'
            : undefined);

    return error ? (
        <h1>{error}</h1>
    ) : (
        <div className={SignInLoadingContainer}>
            <Loading />
            <h1>Loading...</h1>
        </div>
    );
};

function FullPage() {
    return (
        <Layout>
            <Page />
        </Layout>
    );
}

export default FullPage;

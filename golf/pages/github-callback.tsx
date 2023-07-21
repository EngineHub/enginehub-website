import { useEffect, useState } from 'react';
import router from 'next/router';
import { useSetToken } from '../src/components/Auth';
import { Loading } from '../src/components/Loading';
import Layout from '../src/Layout';
import { SignInLoadingContainer } from '../src/components/Loading.module.css';

const Page = () => {
    const [errorMessage, setError] = useState<string>();

    const setToken = useSetToken();

    useEffect(() => {
        const code = new URLSearchParams(location.search).get('code');

        if (!code) {
            setError('Could not find code in query params!');
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
    }, [setToken]);

    return errorMessage ? (
        <h1>{errorMessage}</h1>
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

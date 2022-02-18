import React, { useEffect, useState } from 'react';
import router from 'next/router';
import { useSetToken } from '../src/components/Auth';
import { Loading } from '../src/components/Loading';
import styled from 'styled-components';
import Layout from '../src/Layout';

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 120px;

    h1 {
        margin-left: 20px;
    }
`;

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
                    router.push('/');
                } else if (error) {
                    setError(error);
                } else {
                    setError('An unexpected error occurred');
                }
            });
    }, [setToken]);

    return errorMessage ? (
        <h1>{errorMessage}</h1>
    ) : (
        <LoadingContainer>
            <Loading />
            <h1>Loading...</h1>
        </LoadingContainer>
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

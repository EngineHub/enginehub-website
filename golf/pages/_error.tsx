import React from 'react';
import { NextPageContext } from 'next';
import NextError from 'next/error';
import { SEO, PageHeader, Container, BlueButtonStyle } from '@enginehub/shared';
import styled from 'styled-components';
import Layout from '../src/Layout';

export const BlueButton = styled.a(BlueButtonStyle);

function Error({ statusCode }: { statusCode: number }) {
    if (statusCode === 404) {
        return (
            <Layout>
                <SEO title={'Missing Page'} />
                <PageHeader text={'Missing Page'}>
                    Sorry, the page or resource that you are looking for cannot be found.
                </PageHeader>
                <Container>
                   <BlueButton href="https://enginehub.org/">Go to EngineHub.org</BlueButton> 
                </Container>
            </Layout>
        );
    } else {
        return <NextError statusCode={statusCode} />;
    }
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
};

export default Error;

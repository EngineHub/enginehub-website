import React from 'react';
import NextError from 'next/error';
import Layout from '@builds/Layout';
import SEO from '@shared/components/Seo';
import { PageHeader } from '@shared/components/PageHeader';
import { Container } from '@shared/components/Container';
import styled from 'styled-components';
import { BlueButtonStyle } from '@shared/components/Button';
import { NextPageContext } from 'next';

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

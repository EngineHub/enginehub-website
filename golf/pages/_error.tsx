import React from 'react';
import { NextPageContext } from 'next';
import NextError from 'next/error';
import SEO from '@shared/components/Seo';
import { PageHeader } from '@shared/components/PageHeader';
import { Container } from '@shared/components/Container';
import styled from '@emotion/styled';
import { BlueButtonStyle } from '@shared/components/Button';
import Layout from '@golf/Layout';

export const BlueButton = styled.a(BlueButtonStyle);

function Error({ statusCode }: { statusCode: number }) {
    if (statusCode === 404) {
        return (
            <Layout>
                <SEO title={'Missing Page'} />
                <PageHeader text={'Missing Page'} showSponsors={true}>
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

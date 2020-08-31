import React from 'react';
import Layout from '@builds/Layout';
import SEO from '@shared/components/Seo';
import { PageHeader } from '@shared/components/PageHeader';
import { Container } from '@shared/components/Container';
import styled from 'styled-components';
import { BlueButtonStyle } from '@shared/components/Button';

export const BlueButton = styled.a(BlueButtonStyle);

const MissingPage: React.FC = () => (
    <Layout>
        <SEO title={'Missing Page'} />
        <PageHeader text={'Missing Page'}>
            Sorry, the page or resource that you are looking for cannot be
            found.
        </PageHeader>
        <Container>
            <BlueButton href="https://enginehub.org/">
                Go to EngineHub.org
            </BlueButton>
        </Container>
    </Layout>
);

export default MissingPage;

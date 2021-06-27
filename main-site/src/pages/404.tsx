import React from 'react';

import Layout from '../components/Layout';
import { SEO, Container, PageHeader } from '@enginehub/shared';
import { graphql } from 'gatsby';
import { BlueButton } from '../components/Button';

interface NotFoundData {
    file: {
        publicURL: string
    };
}

const NotFoundPage = ({ data }: { data: NotFoundData }) => (
    <Layout>
        <SEO
            title="Missing Page"
            image={data.file.publicURL}
            description="Sorry, the page or resource that you are looking for cannot be found."
        />
        <PageHeader text={'Missing Page'} extraSponsors={['netlify']}>
            Sorry, the page or resource that you are looking for cannot be
            found.
        </PageHeader>
        <Container>
            <BlueButton to="/">Go to EngineHub.org</BlueButton>
        </Container>
    </Layout>
);

export default NotFoundPage;

export const query = graphql`
    query {
        file(name: { eq: "enginehub-logo" }) {
            publicURL
        }
    }
`;

import React from 'react';

import Layout from '@main/components/Layout';
import SEO from '@shared/components/Seo';
import { graphql } from 'gatsby';
import { BlueButton } from '@main/components/Button';
import { Container } from '@shared/components/Container';
import { PageHeader } from '@shared/components/PageHeader';

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

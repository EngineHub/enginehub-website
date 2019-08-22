import React from 'react';

import Layout from '../components/layout';
import SEO from '@shared/components/seo';
import { graphql } from 'gatsby';
import { FixedObject } from 'gatsby-image';
import { BlueButton } from '@main/components/button';
import { Container } from '@shared/components/container';
import { PageHeader } from '@shared/components/PageHeader';

interface NotFoundData {
    file: {
        childImageSharp: {
            fixed: FixedObject;
        }
    };
}

const NotFoundPage = ({ data }: { data: NotFoundData }) => (
    <Layout>
        <SEO title="Missing Page" image={data.file.childImageSharp.fixed.src} />
        <PageHeader text={'Missing Page'} showSponsors={true}>
            Sorry, the page or resource that you are looking for cannot be found.
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
            childImageSharp {
                fixed(width: 100, height: 100, quality: 100) {
                    ...GatsbyImageSharpFixed_tracedSVG
                }
            }
        }
    }
`;

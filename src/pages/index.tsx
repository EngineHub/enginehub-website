import React from 'react';

import Layout from '../components/layout.component';
import SEO from '../components/seo.component';
import styled from '@emotion/styled';
import { Container } from '../components/container.component';

const HeadingContainer = styled.div`
    margin: 20px 0 60px;
    text-align: center;
`;

const FeatureHeading = styled.h2`
    padding: 8px 60px;
    border-bottom: 1px solid #d0d0d0;
    font-weight: 700;
    font-size: 21px;
    line-height: 1.8;
    display: inline-block;
    margin-top: 23px;
    margin-bottom: 11.5px;
`;

const IndexPage = () => (
    <Layout landing={true}>
        <SEO title="Welcome" description="Open-source mods for and by the Minecraft community" />
        <Container>
            <HeadingContainer>
                <FeatureHeading>Our Projects</FeatureHeading>
            </HeadingContainer>
        </Container>
    </Layout>
);

export default IndexPage;

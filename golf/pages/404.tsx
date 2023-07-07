import Layout from '../src/Layout';
import { SEO, PageHeader, Container, BlueButtonStyle } from '@enginehub/shared';
import { styled } from 'styled-components';

export const BlueButton = styled.a(BlueButtonStyle);

const MissingPage = () => (
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

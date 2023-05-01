import Layout from '../src/components/Layout';
import { SEO, Container, PageHeader, BlueButton } from '@enginehub/shared';

const NotFoundPage = () => (
    <Layout>
        <SEO
            title="Missing Page"
            image={'/images/enginehub-logo.png'}
            description="Sorry, the page or resource that you are looking for cannot be found."
        />
        <PageHeader text={'Missing Page'}>
            Sorry, the page or resource that you are looking for cannot be
            found.
        </PageHeader>
        <Container>
            <BlueButton href="/">Go to EngineHub.org</BlueButton>
        </Container>
    </Layout>
);

export default NotFoundPage;

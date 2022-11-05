import Layout from '../src/components/Layout';
import { SEO, Container, PageHeader, BlueButton } from '@enginehub/shared';
import Link from 'next/link';

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
            <Link href="/" legacyBehavior={true} passHref={true}>
                <BlueButton>Go to EngineHub.org</BlueButton>
            </Link>
        </Container>
    </Layout>
);

export default NotFoundPage;

import Link from 'next/link';
import Layout from '../src/components/Layout';
import {
    SEO,
    Container,
    PageHeader,
    Button,
    PrimaryButton
} from '@enginehub/shared';

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
        <div className={Container}>
            <Link className={`${Button} ${PrimaryButton}`} href="/">
                Go to EngineHub.org
            </Link>
        </div>
    </Layout>
);

export default NotFoundPage;

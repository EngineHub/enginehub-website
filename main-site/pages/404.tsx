import Link from 'next/link';

import {
    Button,
    Container,
    PageHeader,
    PrimaryButton,
    SEO
} from '@enginehub/shared';

import Layout from '../src/components/Layout';

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

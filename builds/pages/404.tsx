import {
    Button,
    Container,
    PageHeader,
    PrimaryButton,
    SEO
} from '@enginehub/shared';

import Layout from '../src/Layout';

const MissingPage = () => (
    <Layout>
        <SEO title={'Missing Page'} />
        <PageHeader text={'Missing Page'}>
            Sorry, the page or resource that you are looking for cannot be
            found.
        </PageHeader>
        <div className={Container}>
            <a
                className={`${Button} ${PrimaryButton}`}
                href="https://enginehub.org/"
            >
                Go to EngineHub.org
            </a>
        </div>
    </Layout>
);

export default MissingPage;

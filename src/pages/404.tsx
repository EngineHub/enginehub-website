import React from 'react';

import Layout from '../components/layout.component';
import SEO from '../components/seo.component';

const NotFoundPage = () => (
    <Layout>
        <SEO title="Missing Page" />
        <h1>Missing Page</h1>
        <p>Sorry, the page or resource that you are looking for cannot be found.</p>
    </Layout>
);

export default NotFoundPage;

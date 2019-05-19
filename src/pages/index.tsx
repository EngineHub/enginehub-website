import React from 'react';

import Layout from '../components/layout.component';
import SEO from '../components/seo.component';

const IndexPage = () => (
    <Layout landing={true}>
        <SEO title="Welcome" description="Open-source mods for and by the Minecraft community" />
    </Layout>
);

export default IndexPage;

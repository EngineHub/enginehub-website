import React from 'react';
import Layout from '../src/layout';
import { Container } from '@shared/components/container';
import { WarningBox } from '@shared/components/WarningBox';
import SEO from '@shared/components/seo';
import { PageHeader } from '@shared/components/PageHeader';

function Index() {
    return (
        <Layout>
            <SEO title={"Builds"} />
            <PageHeader text={"Builds"} showSponsors={true} />
            <Container>
                <WarningBox>
                    <b>The builds page is temporarily unavailable due to a hardware failure! Please use release
                    builds from <a href="https://enginehub.org/">here</a> for
                    now, or <a href="https://discord.gg/enginehub">join the Discord</a> for dev builds.</b>
                </WarningBox>
            </Container>
        </Layout>
    );
}

Index.getInitialProps = async ({}) => {
    return { data: await new Promise((resolve, _reject) => resolve()) };
};

export default Index;

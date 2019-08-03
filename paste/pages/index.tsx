import React from 'react';
import { Layout } from '@paste/Layout';

function Index() {
    return (
        <Layout>
            <h1>
                EngineHub Pastebin Service is currently under maintenance. If
                you're trying to upload logs for a support request, upload the
                file straight to Discord.
            </h1>
        </Layout>
    );
}

Index.getInitialProps = async ({}) => {
    return { data: await new Promise((resolve, _reject) => resolve()) };
};

export default Index;

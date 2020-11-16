import { Layout } from '@paste/Layout';
import PasteComponent from '@paste/views/PasteComponent';
import React from 'react';

function ErrorPage() {
    return (
        <Layout>
            <PasteComponent paste={'Paste not found!'} />
        </Layout>
    );
}

export default ErrorPage;

import { Layout } from '@paste/Layout';
import PasteComponent from '@paste/views/PasteComponent';
import SEO from '@shared/components/Seo';
import React from 'react';

function ErrorPage() {
    return (
        <Layout>
            <SEO
                title="Unknown Paste | EngineHub Pastebin"
                description="EngineHub Pastebin Service. Store logs, profiles, and reports with ease."
            />
            <PasteComponent paste={'Paste not found!'} />
        </Layout>
    );
}

export default ErrorPage;

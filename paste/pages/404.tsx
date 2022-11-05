import { Layout } from '../src/Layout';
import PasteComponent from '../src/views/PasteComponent';
import { SEO } from '@enginehub/shared';

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

import Document, {
    type DocumentProps,
    Head,
    Html,
    Main,
    NextScript
} from 'next/document';

import { ThemeInjector } from '@enginehub/shared';

class MyDocument extends Document<DocumentProps> {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
                    />

                    <link
                        rel="shortcut icon"
                        href="/static/icons/icon-48x48.png"
                    />
                    <meta name="theme-color" content="#4B3570" />
                    <link
                        rel="apple-touch-icon"
                        sizes="48x48"
                        href="/static/icons/icon-48x48.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="72x72"
                        href="/static/icons/icon-72x72.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="96x96"
                        href="/static/icons/icon-96x96.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="144x144"
                        href="/static/icons/icon-144x144.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="192x192"
                        href="/static/icons/icon-192x192.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="256x256"
                        href="/static/icons/icon-256x256.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="384x384"
                        href="/static/icons/icon-384x384.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="512x512"
                        href="/static/icons/icon-512x512.png"
                    />

                    <link
                        href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
                        rel="stylesheet"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_TRACKING_ID}');
          `
                        }}
                    />
                    <ThemeInjector />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

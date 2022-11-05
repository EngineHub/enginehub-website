/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Children } from 'react';
import type { DocumentContext, DocumentProps } from 'next/document';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document<DocumentProps> {
    static async getInitialProps(ctx: DocumentContext) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;

        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    enhanceApp: App => props =>
                        sheet.collectStyles(<App {...props} />)
                });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: [
                    ...Children.toArray(initialProps.styles),
                    sheet.getStyleElement()
                ]
            };
        } finally {
            sheet.seal();
        }
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap"
                        rel="stylesheet"
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

                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async={true}
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
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

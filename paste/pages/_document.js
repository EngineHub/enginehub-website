import React from 'react';
import Document, { Head, Main, NextScript, Html } from 'next/document';
import Helmet from 'react-helmet';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, helmet: Helmet.renderStatic() };
  }

  render() {
    const { helmet } = this.props;

    return (
      <Html {...helmet.htmlAttributes.toComponent()}>
        <Head>
          {helmet.meta.toComponent()}
          {helmet.title.toComponent()}
          {helmet.link.toComponent()}
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GA_TRACKING_ID}');
          `}} />
        </Head>
        <body {...helmet.bodyAttributes.toComponent()}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

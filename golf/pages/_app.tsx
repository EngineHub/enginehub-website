import '../src/layout.global.css';

import type { AppProps } from 'next/app';
import Router from 'next/router';

import { gtag } from '@enginehub/shared';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

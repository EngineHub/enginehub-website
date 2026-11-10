import '../src/layout.global.css';

import type { AppProps } from 'next/app';
import Router from 'next/router';

import { gtag } from '@enginehub/shared';

import { AuthProvider } from '../src/components/Auth';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

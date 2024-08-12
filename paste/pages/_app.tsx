import '../src/layout.global.css';

import Router from 'next/router';

import { gtag } from '@enginehub/shared';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

export { default } from 'next/app';

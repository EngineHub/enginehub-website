import App from 'next/app';
import Router from 'next/router';
import '../src/layout.global.css';

import { gtag } from '@enginehub/shared';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

export default App;

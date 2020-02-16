import App from 'next/app';
import Router from 'next/router';
import '../src/layout.css';

import * as gtag from '@shared/utils/gtag';

Router.events.on('routeChangeComplete', url => gtag.pageview(url));

export default App;

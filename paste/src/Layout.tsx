import React, { FC } from 'react';
import Helmet from 'react-helmet';
import { Header } from './Header';
import './layout.css';

export const Layout: FC = ({ children }) => (
    <>
        <Helmet
            title={'Pastebin at EngineHub'}
            link={[
                {
                    href: `${process.env.STATIC_PREFIX}/static/pace-theme.css`,
                    rel: 'stylesheet'
                }
            ]}
            script={[
                {
                    src: `${process.env.STATIC_PREFIX}/static/pace.min.js`
                }
            ]}
        />
        <Header />
        <main>{children}</main>
    </>
);

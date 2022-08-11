import React, { FunctionComponent } from 'react';
import Head from 'next/head';

interface SEOProps {
    description?: string;
    lang?: string;
    title: string;
    image?: string;
}

export const SEO: FunctionComponent<SEOProps> = ({
    description = 'Open-source mods for and by the Minecraft community',
    title,
    image
}) => {
    return (
        <Head>
            <title>{`${title} | EngineHub`}</title>
            <meta
                name="description"
                property="og:description"
                content={description}
            />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta property="og:image" content={image} />
        </Head>
    );
};

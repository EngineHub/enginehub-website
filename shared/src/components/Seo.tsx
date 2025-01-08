import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FunctionComponent } from 'react';

import {
    getDefaultStructuredData,
    SITE_URL,
    type StructuredDataGenerator
} from './structured_data';

interface SEOProps {
    description?: string;
    lang?: string;
    title: string;
    image?: string;
    structuredData?: StructuredDataGenerator;
}

export const SEO: FunctionComponent<SEOProps> = ({
    description = 'Open-source mods for and by the Minecraft community',
    title,
    image,
    structuredData = getDefaultStructuredData
}) => {
    const router = useRouter();

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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        structuredData({
                            title,
                            url: `${SITE_URL}${router.asPath}`
                        })
                    )
                }}
            ></script>
        </Head>
    );
};

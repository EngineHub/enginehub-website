import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
    description?: string;
    lang?: string;
    meta?: any[];
    keywords?: string[];
    title: string;
    image?: string;
}

const SEO: FunctionComponent<SEOProps> = ({
    description = 'Open-source mods for and by the Minecraft community',
    lang = 'en',
    meta = [],
    keywords = [],
    title,
    image
}) => {
    return (
        <Helmet
            htmlAttributes={{
                lang
            }}
            title={title}
            titleTemplate={`%s | EngineHub`}
            meta={[
                {
                    name: `description`,
                    content: description
                },
                {
                    property: `og:title`,
                    content: title
                },
                {
                    property: `og:description`,
                    content: description
                },
                {
                    property: `og:type`,
                    content: `website`
                },
                {
                    name: `twitter:card`,
                    content: `summary`
                },
                {
                    name: `twitter:creator`,
                    content: '@the_me4502'
                },
                {
                    name: `twitter:title`,
                    content: title
                },
                {
                    name: `twitter:description`,
                    content: description
                },
                {
                    property: `og:image`,
                    content: image
                }
            ]
                .concat(
                    keywords.length > 0
                        ? {
                              name: `keywords`,
                              content: keywords!.join(`, `)
                          }
                        : []
                )
                .concat(meta)}
        />
    );
};

export default SEO;

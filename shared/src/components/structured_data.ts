import type {
    Organization,
    ProfilePage,
    Thing,
    WebPage,
    WebSite
} from 'schema-dts';

export const SITE_URL = `https://enginehub.org`;

const BASE_SCHEMA = {
    '@context': 'https://schema.org'
};

const BASE_ORG: Organization = {
    '@type': 'Organization',
    name: 'EngineHub',
    mainEntityOfPage: `${SITE_URL}/`,
    '@id': `${SITE_URL}/#org`
};

const BASE_WEBSITE: WebSite = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/`,
    name: `EngineHub: Open-source mods for and by the Minecraft community`,
    url: `${SITE_URL}/`,
    author: BASE_ORG
};

const ORG: Organization = {
    ...BASE_ORG,
    description: `EngineHub: Open-source mods for and by the Minecraft community`,
    sameAs: [
        'https://github.com/EngineHub',
        'https://modrinth.com/organization/enginehub',
        'https://hangar.papermc.io/EngineHub',
        'https://ore.spongepowered.org/EngineHub'
    ],
    member: [
        {
            '@type': 'Person',
            '@id': 'https://madelinemiller.dev/contact/#person',
            name: 'Maddy Miller'
        }
    ]
};

interface StructuredDataGeneratorProps {
    title: string;
    url: string;
}

export type StructuredDataGenerator = (
    props: StructuredDataGeneratorProps
) => Thing[];

export const getDefaultStructuredData: StructuredDataGenerator = ({
    title,
    url
}) => {
    return [
        {
            ...BASE_SCHEMA,
            '@type': 'WebPage',
            '@id': url,
            isPartOf: BASE_WEBSITE,
            name: title,
            url
        } satisfies WebPage
    ];
};

export const getHomeStructuredData: StructuredDataGenerator = ({
    title,
    url
}) => {
    return [
        {
            ...BASE_SCHEMA,
            ...BASE_WEBSITE,
            alternateName: [`EngineHub`, `enginehub.org`]
        },
        ...getDefaultStructuredData({ title, url }),
        {
            ...BASE_SCHEMA,
            '@type': 'ProfilePage',
            '@id': `${SITE_URL}/`,
            url: `${SITE_URL}/`,
            mainEntity: ORG,
            isPartOf: BASE_WEBSITE
        } satisfies ProfilePage
    ];
};

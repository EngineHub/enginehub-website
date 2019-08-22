module.exports = {
    siteMetadata: {
        title: `EngineHub`,
        description: `Open-source mods for and by the Minecraft community`,
        author: `@the_me4502`,
        siteUrl: 'https://enginehub.org/'
    },
    plugins: [
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`
            }
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: ['UA-139849956-1'],
                pluginConfig: {
                    // Puts tracking script in the head instead of the body
                    head: true
                }
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `EngineHub`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#4B3570`,
                theme_color: `#4B3570`,
                display: `minimal-ui`,
                icon: `src/images/enginehub-logo.png` // This path is relative to the root of the site.
            }
        },
        {
            resolve: `gatsby-plugin-react-helmet-canonical-urls`,
            options: {
                siteUrl: `https://enginehub.org`
            }
        },
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        `gatsby-plugin-offline`
    ]
};

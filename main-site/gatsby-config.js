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
            resolve: `gatsby-plugin-styled-components`,
            options: {
                displayName: false,
                pure: true
            }
        },
        {
            resolve: `gatsby-plugin-svgr`,
            options: {
                svgo: false
            }
        },
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
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: 'UA-139849956-1',
                // Puts tracking script in the head instead of the body
                head: true
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `EngineHub`,
                short_name: `EngineHub`,
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
        {
            resolve: `gatsby-plugin-robots-txt`,
            options: {
                policy: [{ userAgent: '*', allow: '/', disallow: '/cdn-cgi/' }]
            }
        },
        {
            resolve: `gatsby-plugin-netlify`
        }
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`
    ]
};

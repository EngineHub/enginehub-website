module.exports = {
    siteMetadata: {
        title: `EngineHub`,
        description: `Open-source mods for and by the Minecraft community`,
        author: `@the_me4502`,
        siteUrl: 'https://enginehub.org/'
    },
    plugins: [
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-robots-txt`,
            options: {
                policy: [{ userAgent: '*', allow: '/', disallow: '/cdn-cgi/' }]
            }
        }
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`
    ]
};

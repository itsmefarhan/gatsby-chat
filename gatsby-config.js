module.exports = {
  siteMetadata: {
    title: `Gatsby Chat`,
    description: `Chat app built with Gatsby, Netlify Functions, MongoDB and React Bootstrap`,
    author: `Farhan Farooq`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    // {
    //   resolve: 'gatsby-source-graphql',
    //   options: {
    //     // This type will contain remote schema Query type
    //     typeName: "GSG",
    //     // This is field under which it's accessible
    //     fieldName: "GetQueries",
    //     // Url to query from
    //     url:
    //       "/.netlify/functions/chat",
    //   },
    // }
  ],
}

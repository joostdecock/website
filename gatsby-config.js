const i18nConfig = require('./src/config/i18n.js');

module.exports = {
  siteMetadata: {
    title: "Freesewing v2 demo",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-catch-links",
    "gatsby-transformer-remark",
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/data/i18n`,
        name: "i18n",
        ignore: [`**/\.*`],
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/markdown/blog`,
        name: "blog",
        ignore: [`**/\.*`],
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: []
      }
    },
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: `src/config/typography`,
        omitGoogleFont: true
      }
    },
    {
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: i18nConfig.defaultLanguage,
        useLangKeyLayout: false
      }
    }
  ]
};

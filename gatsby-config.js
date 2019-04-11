const i18nConfig = require("./src/config/i18n.js");
const algolia = require("./search-queries.js");
const path = require("path");

module.exports = {
  siteMetadata: {
    title: "Freesewing beta"
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sass",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, "src", "markdown"),
        name: "markdown",
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, "src", "assets", "images"),
        name: "images",
        ignore: [`**/\.*`]
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-autolink-headers",
          "gatsby-remark-external-links",
          "gatsby-remark-copy-linked-files",
          "gatsby-remark-smartypants",
          {
            resolve: "gatsby-remark-component",
            options: { components: ["api-example", "pattern-example"] }
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 650,
              showCaptions: true,
              linkImagesToOriginal: true,
              backgroundColor: "#000"
            }
          },
          {
            resolve: "gatsby-remark-toc",
            options: {
              header: "Table of Contents", // the custom header text
              include: [
                "markdown/**/*.md" // an include glob to match against
              ],
              mdastUtilTocOptions: { maxDepth: 3 }
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: false,
              noInlineHighlight: false,
              languages: ["javascript", "json", "yaml"]
            }
          }
        ]
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
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyForNull: "any",
        langKeyDefault: i18nConfig.defaultLanguage,
        useLangKeyLayout: false
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: "#1FAA00",
        showSpinner: false
      }
    },
    //{
    //  resolve: `gatsby-plugin-algolia`,
    //  options: {
    //    appId: process.env.GATSBY_ALGOLIA_API_ID,
    //    apiKey: process.env.GATSBY_ALGOLIA_UPDATE_KEY,
    //    queries: algolia,
    //    chunkSize: 10000
    //  }
    //},
    "gatsby-plugin-netlify"
  ]
};

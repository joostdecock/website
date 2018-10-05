const i18nConfig = require('./src/config/i18n.js');
const path = require('path');

module.exports = {
  siteMetadata: {
    title: "Freesewing v2 demo",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-catch-links",
    "gatsby-transformer-remark",
    "gatsby-plugin-sass",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    //{
    //  resolve: `gatsby-source-filesystem`,
    //  options: {
    //    path: `${__dirname}/src/pages`,
    //    name: "pages",
    //  }
    //},
    //{
    //  resolve: `gatsby-source-filesystem`,
    //  options: {
    //    path: `${__dirname}/src/data/i18n`,
    //    name: "i18n",
    //    ignore: [`**/\.*`],
    //  }
    //},
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.join(__dirname, "src", "images"),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, "src", "pages"),
        name: "markdown",
        ignore: [`**/\.*`],
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-copy-linked-files",
       		{
        	  resolve: `gatsby-remark-images`,
        	  options: {
        	    maxWidth: 650,
							showCaptions: true,
							linkImagesToOriginal: true,
							backgroundColor: '#212121',
        	  },
        	},
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
      resolve: 'gatsby-plugin-i18n',
      options: {
        langKeyForNull: 'any',
        langKeyDefault: i18nConfig.defaultLanguage,
        useLangKeyLayout: false
      }
    }
  ]
};

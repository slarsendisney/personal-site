require("dotenv").config({
  path: `.env`,
})

//https://codes.us4.list-manage.com/subscribe/post?u=0cf960d42e04bd50f7c21d709&amp;id=35a0b97fdb

const EmploymentHistory = require("./src/data/timeline.json")
const currentJob = EmploymentHistory[0]
const dynamicPlugins = []
const startDate = new Date()
startDate.setMonth(startDate.getMonth() - 3)
if (
  process.env.GUESS_EMAIL &&
  process.env.GUESS_PRIVATE_KEY &&
  process.env.VIEW_ID
) {
  dynamicPlugins.push({
    resolve: `gatsby-plugin-guess-js`,
    options: {
      GAViewID: process.env.VIEW_ID,
      jwt: {
        client_email: process.env.GUESS_EMAIL,
        private_key: process.env.GUESS_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      period: {
        startDate,
        endDate: new Date(),
      },
    },
  })
}

module.exports = {
  siteMetadata: {
    title: `SLD | Sam Larsen-Disney`,
    description: `Sam Larsen-Disney | ${currentJob.role} working @ ${currentJob.company}.`,
    author: `@sld`,
    siteUrl: `https://sld.codes`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      options: {
        siteUrl: `https://sld.codes`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://sld.codes",
        sitemap: "https://sld.codes/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        // tailwind: true, // Enable tailwindcss support
        whitelist: ["pre", "dark-mode", "slick-slide"], // Don't remove this selector
        ignore: ["node_modules/"], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    {
      resolve: "gatsby-plugin-use-dark-mode",
      options: {
        classNameDark: "dark-mode",
        classNameLight: "light-mode",
        storageKey: "darkMode",
        minify: true,
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: `https://medium.com/feed/@samlarsendisney`,
        name: `MediumBlog`,
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint:
          "https://codes.us4.list-manage.com/subscribe/post?u=0cf960d42e04bd50f7c21d709&amp;id=35a0b97fdb",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          "@weknow/gatsby-remark-twitter",
          {
            resolve: `gatsby-remark-images`,
          },
          `gatsby-remark-copy-images`,
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `nike-data`,
        path: `${__dirname}/data/nike/all`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/MD`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `documents`,
        path: `${__dirname}/files`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    {
      resolve: "gatsby-plugin-sentry",
      options: {
        dsn: "https://e95ebaa6275f4e81bb4ed1d66e102991@sentry.io/2687811",
        environment: process.env.NODE_ENV,
        enabled: (() =>
          ["production", "stage"].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Sam Larsen-Disney",
        short_name: "SLD",
        start_url: "/",
        background_color: "#ea4e68",
        theme_color: "#2e4052",
        display: "standalone",
        icon: `src/images/favicon.png`,
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-26978781-2",
        head: false,
      },
    },

    "gatsby-plugin-offline",
  ].concat(dynamicPlugins),
}

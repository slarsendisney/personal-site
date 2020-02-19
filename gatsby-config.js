require("dotenv").config({
  path: `.env`,
})

const dynamicPlugins = []
// pick data from 3 months ago
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
    description: `Sam Larsen-Disney | Design Engineer working @ American Express.`,
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
    `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-sass`,
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
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
            {
              allMarkdownRemark(
                             sort: { order: DESC, fields: [frontmatter___date] },
                             filter: { frontmatter: { type: { eq: "Article" } } }
                           ) {
                             edges {
                               node {
                                 excerpt
                                 html
                                 fields { slug }
                                 frontmatter {
                                   title
                                   date
                                 }
                               }
                             }
                           }
                         }
           
            `,
            output: "/rss.xml",
            title: "sld.codes",
          },
        ],
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
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://sld.codes",
        sitemap: "https://sld.codes/sitemap.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },

    "gatsby-plugin-offline",
  ].concat(dynamicPlugins),
}

require("dotenv").config({
  path: `.env`,
});

Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

const { formatTitleForURL } = require("./src/utils/formatTitleForURL");
const tailwindConfig = require("./tailwind.config.js");
const EmploymentHistory = require("./src/data/timeline.json");
const currentJob = EmploymentHistory[0];

const dayOfYear = (date) =>
  Math.floor(
    (date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
const currentAnimationFrame = (dayOfYear(new Date()) - 1).pad(3);
console.log(`Favicon Animation Frame: ${currentAnimationFrame}`)
const dynamicPlugins = [];

if (
  process.env.GUESS_EMAIL &&
  process.env.GUESS_PRIVATE_KEY &&
  process.env.VIEW_ID
) {
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);
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
  });
  dynamicPlugins.push({
    resolve: `gatsby-source-google-analytics-reporting-api`,
    options: {
      email: process.env.GUESS_EMAIL,
      key: process.env.GUESS_PRIVATE_KEY.replace(/\\n/g, "\n"),
      viewId: process.env.VIEW_ID,
      startDate: `2019-09-01`,
    },
  });
}

module.exports = {
  siteMetadata: {
    title: `Sam Larsen-Disney`,
    description: `${currentJob.role} working @ ${currentJob.company}.`,
    author: `@SamLarsenDisney`,
    siteUrl: `https://sld.codes`,
    currentRole: currentJob.role,
    currentCompany: currentJob.company,
    currentCompanyURL: currentJob.url,
    social: {
      twitter: `@SamLarsenDisney`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Sam Larsen-Disney",
        short_name: "SLD",
        start_url: "/",
        background_color: "#ea4e68",
        theme_color: "#2e4052",
        display: "standalone",
        icon: `src/images/FaviconAnimation/${currentAnimationFrame}.png`,
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: "gatsby-plugin-eslint",
      options: {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|.cache|public|plugins)/,
        stages: ["develop"],
        options: {
          emitWarning: true,
          failOnError: false,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-meta-redirect`,
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

    // TRANSFORMER PLUGINS
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-remark-images`,

    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-highlight-code`,
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
              removeAccents: true,
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`,
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-copy-relative-linked-files`,
          `gatsby-remark-smartypants`,
        ],
        plugins: [`gatsby-remark-images`, `gatsby-remark-images-medium-zoom`],
      },
    },
    {
      resolve: `gatsby-theme-mdx-deck`,
      options: {
        contentPath: `MDX/Decks`,
        basePath: `/decks`,
      },
    },
    `gatsby-plugin-social-cards`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-images`],
      },
    },
    `gatsby-transformer-json`,

    // SOURCE PLUGINS
    {
      resolve: `gatsby-source-npm-author-packages`,
      options: {
        maintainer: `slarsendisney`,
      },
    },
    {
      resolve: `gatsby-source-github-profile`,
      options: {
        token: process.env.GITHUB_PROFILE_BEARER_TOKEN,
        username: "slarsendisney",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `stats`,
        path: `${__dirname}/data/stats/count_total.json`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdx-pages",
        path: `${__dirname}/MDX/Bio`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdx-pages",
        path: `${__dirname}/MDX/Articles`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdx-pages",
        path: `${__dirname}/MDX/Boilerplates`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdx-pages",
        path: `${__dirname}/MDX/Projects`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdx-pages",
        path: `${__dirname}/MDX/Hack`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "mdx-pages",
        path: `${__dirname}/newsletters`,
      },
    },
    {
      resolve: "gatsby-source-url-metadata",
      options: {
        urls: [
          "lawsofux.com",
          "start.uxdesign.cc",
          "figma.com",
          "sketch.com",
          "carbondesignsystem.com",
          "microsoft.com/design/fluent",
          "spectrum.adobe.com",
          "material.io/design",
          "superposition.design",
          "coolors.co",
          "fontpair.co",
          "spotify.design",
          "blind.com/blog/typography-manual",
          "www.youtube.com/channel/UCZHkx_OyRXHb1D3XTqOidRw",
          "www.youtube.com/user/DesignCourse",
          "www.invisionapp.com/inside-design/how-to-wireframe",
          "www.justinmind.com/blog/wireframes-and-mockups-whats-the-best-option",
        ],
      },
    },

    //LUNR SEARCH
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        fields: [`title`, `desc`],
        resolvers: {
          Mdx: {
            title: (node) => node.frontmatter.title,
            type: (node) => node.frontmatter.type,
            desc: (node) => node.frontmatter.desc,
            tags: (node) =>
              node.frontmatter.tags ? node.frontmatter.tags.join(",") : "",
            path: (node) =>
              node.frontmatter.type === "Article"
                ? "articles/" + formatTitleForURL(node.frontmatter.title)
                : node.frontmatter.path,
          },
        },
        filter: (node, getNode) => {
          if (node.frontmatter) {
            if (
              node.frontmatter.type === "Q&A" ||
              node.frontmatter.type === "BIO"
            ) {
              return false;
            }
          }

          return true;
        },
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [require("tailwindcss")()],
      },
    },
    {
      resolve: "gatsby-plugin-theme-switcher",
      options: {
        defaultDarkTheme: "theme-midnightdreams",
        defaultLightTheme: "theme-blue",
        themeStorageKey: "theme",
        minify: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-26978781-2",
        head: false,
      },
    },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.FIREBASE_API_KEY,
          authDomain: process.env.FIREBASE_AUTH_DOMAIN,
          databaseURL: process.env.FIREBASE_DB_URL,
          projectId: process.env.FIREBASE_PROJECT_ID,
          storageBucket: process.env.FIREBASE_SB,
          messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
          appId: process.env.FIREBASE_APP_ID,
        },
      },
    },
    `gatsby-plugin-offline`,
  ].concat(dynamicPlugins),
};

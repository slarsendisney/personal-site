const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const NavSections = require("./src/data/nav-sections.json")

const importantURls = [
  ...NavSections,
  {
    label: "📄 CV",
    type: "CV",
    url: "/cv",
  },
]
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  actions.createPage({
    path: "/articles",
    component: require.resolve("./src/templates/Articles.js"),
  })

  actions.createPage({
    path: "/projects",
    component: require.resolve("./src/templates/Projects.js"),
  })

  actions.createPage({
    path: "/runs",
    component: require.resolve("./src/templates/Runs.js"),
  })
  actions.createPage({
    path: "/runs/posters",
    component: require.resolve("./src/templates/RunPosters.js"),
  })

  const QandA = path.resolve(`./src/templates/QandA.js`)
  const Article = path.resolve(`./src/templates/Article.js`)
  const LegacyArticle = path.resolve(`./src/templates/LegacyArticle.js`)
  const Project = path.resolve(`./src/templates/Project.js`)
  const result = await graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { type: { in: ["Article", "Project", "Q&A"] } } }
      ) {
        edges {
          node {
            frontmatter {
              path
              type
              title
            }
          }
        }
      }
    }
  `)
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    switch (node.frontmatter.type) {
      case "Q&A":
        createPage({
          path: node.frontmatter.path,
          component: QandA,
        })
        break
      case "Project":
        createPage({
          path: node.frontmatter.path,
          component: Project,
        })
        break
      case "Article":
        createPage({
          path: node.frontmatter.path,
          component: LegacyArticle,
        })
        break
      default:
        console.log(`Unknown page: ${node.frontmatter.type}`)
    }
  })
  const mediumPosts = await graphql(`
    {
      allFeedMediumBlog(sort: { fields: isoDate, order: DESC }) {
        nodes {
          title
          pubDate
          isoDate
          content {
            encoded
          }
          link
        }
      }
    }
  `)

  if (mediumPosts.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  mediumPosts.data.allFeedMediumBlog.nodes.forEach((node) => {
    const slug = "articles/" + node.title.trim().split(" ").join("-")

    createPage({
      path: slug,
      component: Article,
      context: { slug: slug },
    })
  })
}

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions
//   const sitePageRegex = /^\/\w*$/g
//   const index = importantURls.findIndex((item) => item.url === page.path)
//   if (sitePageRegex.test(page.path) && index > -1) {
//     const oldPage = Object.assign({}, page)
//     page.context.title = importantURls[index].label
//     page.context.slug = page.path
//     deletePage(oldPage)
//     createPage(page)
//   }
// }

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
  if (node.internal.type === `FeedMediumBlog`) {
    createNodeField({
      node,
      name: `slug`,
      value: "articles/" + node.title.trim().split(" ").join("-"),
    })
    createNodeField({
      node,
      name: "excerpt",
      value:
        node.content.encoded.replace(/<[^>]*>?/gm, "").substring(0, 150) +
        "...",
    })
    createNodeField({
      node,
      name: "hero-img",
      value: node.content.encoded.match(/src\s*=\s*"(.+?)"/)[1],
    })
  }
}

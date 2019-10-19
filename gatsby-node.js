const path = require(`path`)
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

  const QandA = path.resolve(`./src/templates/QandA.js`)
  const Article = path.resolve(`./src/templates/Article.js`)
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
      case "Article":
        createPage({
          path: node.frontmatter.path,
          component: Article,
        })
        break
      case "Project":
        createPage({
          path: node.frontmatter.path,
          component: Project,
        })
        break
      default:
        console.log(`Unknown page: ${node.frontmatter.type}`)
    }
  })
}

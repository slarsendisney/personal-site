const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

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
  mediumPosts.data.allFeedMediumBlog.nodes.forEach(node => {
    const slug = "articles/" + node.title.split(" ").join("-")
    createPage({
      path: slug,
      component: Article,
      context: { slug: slug },
    })
  })
}

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
      value: "articles/" + node.title.split(" ").join("-"),
    })
  }
}

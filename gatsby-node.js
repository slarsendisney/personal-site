const path = require(`path`)
const { formatTitleForURL } = require("./src/utils/formatTitleForURL")
const redirects = [
  {
    from: "/articles/Sharing-Presentations-Without-Sharing-My-Screen",
    to: "/articles/Presenting-Without-Sharing-My-Screen",
  },
]

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions
  redirects.forEach((redirect) => {
    createRedirect({
      fromPath: redirect.from,
      toPath: redirect.to,
      isPermanent: true,
    })
    createRedirect({
      fromPath: redirect.from + "/",
      toPath: redirect.to + "/",
      isPermanent: true,
    })
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
  const MDXArticle = path.resolve(`./src/templates/MDXArticle.js`)
  const Project = path.resolve(`./src/templates/Project.js`)
  const result = await graphql(`
    {
      allMdx(
        limit: 1000
        filter: { frontmatter: { type: { in: ["Project", "Q&A"] } } }
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
  result.data.allMdx.edges.forEach(({ node }) => {
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
      default:
        console.log(`Unknown page: ${node.frontmatter.type}`)
    }
  })

  const mdxPosts = await graphql(`
    {
      allMdx(
        filter: { frontmatter: { type: { eq: "Article" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
            }
          }
        }
      }
    }
  `)
  if (mdxPosts.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  const posts = mdxPosts.data.allMdx.edges
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/articles` : `/articles/${i + 1}`,
      component: require.resolve("./src/templates/Articles.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        slug: i === 0 ? `/articles` : `/articles/${i + 1}`,
      },
    })
  })
  mdxPosts.data.allMdx.edges.forEach((item) => {
    const slug = "articles/" + formatTitleForURL(item.node.frontmatter.title)
    createPage({
      path: slug,
      component: MDXArticle,
      context: { slug: slug },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField, deleteNode, createRedirect } = actions

  if (node.internal.type === "Mdx" && node.frontmatter.type === "Article") {
    createNodeField({
      node,
      name: `slug`,
      value: "articles/" + formatTitleForURL(node.frontmatter.title),
    })
    if (node.frontmatter.path) {
      createRedirect({
        fromPath: node.frontmatter.path,
        toPath: "articles/" + formatTitleForURL(node.frontmatter.title),
        isPermanent: true,
      })
    }
  }
}

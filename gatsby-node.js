const path = require(`path`);
const _ = require("lodash");
const { formatTitleForURL } = require("./src/utils/formatTitleForURL");
const { copyDir } = require("./utils/funcs");

const redirects = [
  {
    from: "/articles/Sharing-Presentations-Without-Sharing-My-Screen",
    to: "/articles/Presenting-Without-Sharing-My-Screen",
  },
  {
    from: "/newsletters",
    to: "/newsletter",
  },
];

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions;

  const functionFullURL = (path) =>
    path
      ? "https://sld.codes" + (path.charAt(0) === "/" ? path : "/" + path)
      : "https://sld.codes";
  let videoManifest = [];

  fs.readdirSync("./src/pages").forEach((file) => {
    const pagePath = file.replace(".js", "");
    const url =
      pagePath !== "index" ? functionFullURL(pagePath) : functionFullURL();
    videoManifest.push({
      type: "Page",
      path: pagePath,
      url,
    });
  });

  redirects.forEach((redirect) => {
    createRedirect({
      fromPath: redirect.from,
      toPath: redirect.to,
      isPermanent: true,
    });
    createRedirect({
      fromPath: redirect.from + "/",
      toPath: redirect.to + "/",
      isPermanent: true,
    });
  });
  actions.createPage({
    path: "/projects",
    component: require.resolve("./src/templates/projects.js"),
  });

  //   const QandA = path.resolve(`./src/templates/QandA.js`);
  const MDXArticle = path.resolve(`./src/templates/article.js`);
  const Project = path.resolve(`./src/templates/project.js`);
  const TagPage = path.resolve(`./src/templates/tags.js`);
  const result = await graphql(`
    {
      allMdx(
        limit: 1000
        filter: { frontmatter: { type: { in: ["Project"] } } }
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
      tagsGroup: allMdx(
        filter: { frontmatter: { type: { in: ["Project", "Article"] } } }
      ) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  result.data.allMdx.edges.forEach(({ node }) => {
    switch (node.frontmatter.type) {
      case "Project":
        createPage({
          path: node.frontmatter.path,
          component: Project,
        });
        videoManifest.push({
          type: "Page",
          path: node.frontmatter.path,
          url: functionFullURL(node.frontmatter.path),
        });
        break;
      default:
        console.log(`Unknown page: ${node.frontmatter.type}`);
    }
  });

  result.data.tagsGroup.group.forEach((tag) => {
    createPage({
      path: `tags/${_.kebabCase(tag.fieldValue)}/`,
      component: TagPage,
      context: {
        tag: tag.fieldValue,
      },
    });
  });

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
              tags
            }
          }
        }
      }
    }
  `);
  if (mdxPosts.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const posts = mdxPosts.data.allMdx.edges;
  const postsPerPage = 6;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/articles` : `/articles/${i + 1}`,
      component: require.resolve("./src/templates/articles.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        slug: i === 0 ? `/articles` : `/articles/${i + 1}`,
      },
    });
    videoManifest.push({
      type: "Page",
      path: i === 0 ? `/articles` : `/articles/${i + 1}`,
      url: functionFullURL(i === 0 ? `/articles` : `/articles/${i + 1}`),
    });
  });
  mdxPosts.data.allMdx.edges.forEach((item, index) => {
    const slug = "/articles/" + formatTitleForURL(item.node.frontmatter.title);
    createPage({
      path: slug,
      component: MDXArticle,
      context: { slug: slug, articlePage: Math.floor(index / postsPerPage) },
    });
    videoManifest.push({
      type: "Article",
      path: slug,
      url: functionFullURL(slug),
      title: item.node.frontmatter.title,
      tags:
        "An article about " +
        item.node.frontmatter.tags
          .map(
            (tag, i) =>
              `${tag}${item.node.frontmatter.tags.length - i > 2 ? ", " : ""}${
                item.node.frontmatter.tags.length - 2 === i ? " & " : ""
              }`
          )
          .join(""),
    });
  });

  const jsonString = JSON.stringify(videoManifest);
  fs.writeFile("./remotion/manifest.json", jsonString, (err) => {
    if (err) {
      console.log("Error!", err);
    } else {
      console.log("Wrote video manifest!");
    }
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField, deleteNode, createRedirect } = actions;

  if (node.internal.type === "Mdx" && node.frontmatter.type === "Article") {
    createNodeField({
      node,
      name: `slug`,
      value: "/articles/" + formatTitleForURL(node.frontmatter.title),
    });
    if (node.frontmatter.path) {
      createRedirect({
        fromPath: node.frontmatter.path,
        toPath: "/articles/" + formatTitleForURL(node.frontmatter.title),
        isPermanent: true,
      });
    }
  }
};

const fs = require("fs");

exports.onPostBuild = async () => {
  fs.copyFile(`./firebase.json`, `./public/firebase.json`, (err) => {
    if (err) {
      throw err;
    }
  });
  await copyDir("newsletters", "public/newsletters");
};

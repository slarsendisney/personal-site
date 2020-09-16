const generateCard = require("./social-build").generateCard;
const path = require("path");
const fse = require("fs-extra");
const social_card_dir = "./public/social-cards";
fse.ensureDirSync(social_card_dir);

const dynamicCardTypes = new Set(["Article", "Project"]);
function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    const post = node.frontmatter;
    const timeToRead = Math.ceil(node.internal.content.length / (250 * 5));
    const filename = "social-card-" + node.id + ".jpg";
    const output = path.join("./public/social-cards", filename);
    if (dynamicCardTypes.has(post.type)) {
      generateCard(
        {
          title: post.title,
          tags: post.tags,
          subtitle: post.desc,
          type: post.type,
          timeToRead,
        },
        output
      )
        .then(() => {
          try {
            createNodeField({
              node,
              name: `socialcard`,
              value: "social-card-" + node.id,
            });
          } catch (err) {
            console.error("createNodeField failed");
          }
        })
        .catch((err) => {
          console.error("ERROR while generating card", err);
        });
    }
  }
};

exports.onCreatePage = ({ page, actions }) => {
  const isRootPage = (page.path.match(/\//g) || []).length === 1;
  if (isRootPage) {
    const pathPage = page.path === "/" ? "home" : page.path.substring(1);

    let title = pathPage
      .split("-")
      .map((item) => jsUcfirst(item))
      .join(" ");
    if (page.path === "/cv") {
      title = "CV";
    }
    const filename = "social-card-" + pathPage + ".jpg";
    const output = path.join("./public/social-cards", filename);
    generateCard(
      {
        title,
        noMeta: true,
      },
      output
    );
  }
};

exports.onPostBootstrap = () => {
  const filename = "social-card-default.jpg";
  const output = path.join("./public/social-cards", filename);
  generateCard(
    {
      title: "Hey.",
      noMeta: true,
    },
    output
  );
};

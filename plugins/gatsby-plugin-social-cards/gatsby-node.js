const generateCard = require("./social-build").generateCard;
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");

function base64file(path) {
  const b64 = fs.readFileSync(path, "base64");
  return `data:image/jpeg;base64,${b64}`;
}
const social_card_dir = "./public/social-cards";
fse.ensureDirSync(social_card_dir);

exports.onCreateNode = ({ node, getNode, actions, graphql }, options) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark` || node.internal.type === `Mdx`) {
    const post = node.frontmatter;

    let authorImage64;
    if (options.authorImage && fs.existsSync(options.authorImage)) {
      authorImage64 = base64file(options.authorImage);
    }

    let cover = options.backgroundImage;

    if (post.cover) {
      const { dir } = getNode(node.parent);
      cover = path.join(dir, post.cover);
    }
    const filename = "social-card-" + node.id + ".jpg";
    const output = path.join("./public/social-cards", filename);

    const author = post.author || options.defaultAuthor;
    const subtitle = author ? `by ${author}` : "";

    generateCard(
      {
        title: post.title,
        subtitle,
        backgroundImage: cover,
        design: options.design,
        authorImage64,
      },
      output
    )
      .then(() => {
        console.log(post.title, "generated: " + output);
        try {
          createNodeField({
            node,
            name: `socialcard`,
            value: filename,
          });
        } catch (err) {
          console.error("createNodeField failed");
        }
      })
      .catch((err) => {
        console.error("ERROR while generating card", err);
      });
  }
};

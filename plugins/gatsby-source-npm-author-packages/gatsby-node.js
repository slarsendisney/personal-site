const crypto = require("crypto")
const search = require("libnpmsearch")

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions
  const data = await search(`author:${configOptions.author}`)
  const total = data.length
  createNode({
    totalPackages: Number(total),
    id: "NPM-Profile",
    internal: {
      type: `NPMProfile`,
      mediaType: `text/plain`,
      contentDigest: crypto
        .createHash(`md5`)
        .update(
          JSON.stringify({
            total,
          })
        )
        .digest(`hex`),
      description: `NPM Profile Information`,
    },
  })
  for (let result of data) {
    const { name, description, links, version, keywords } = result
    createNode({
      name,
      description,
      keywords,
      links,
      version,
      id: name,
      internal: {
        type: `NPMPackage`,
        contentDigest: crypto
          .createHash(`md5`)
          .update(JSON.stringify({ name, description, links, version }))
          .digest(`hex`),
        mediaType: `text/plain`,
        description: `NPM package data`,
      },
    })
  }
}

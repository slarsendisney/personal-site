const crypto = require("crypto")
const search = require("libnpmsearch")

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions

  const data = await search("author:dudesamld")
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
    const { name, description, links, version } = result
    createNode({
      name: String(name),
      desc: String(description),
      link: links.npm,
      version: version,
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

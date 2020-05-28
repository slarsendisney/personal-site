const fetch = require("node-fetch")
const crypto = require("crypto")

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions

  const response = await fetch(
    "https://api.npms.io/v2/search?q=author:dudesamld"
  )
  const data = await response.json()

  const { total, results } = data

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
      description: `Github Profile Information`,
    },
  })
  for (let result of results) {
    const { name, description, links, version } = result.package
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
        description: `Page views & sessions for the site`,
      },
    })
  }
}

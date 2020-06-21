const crypto = require("crypto")
const search = require("libnpmsearch")

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions
  const data = await search(
    `${configOptions.author ? `author:${configOptions.author}` : ``} ${
      configOptions.maintainer ? `maintainer:${configOptions.maintainer}` : ``
    }`
  )
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

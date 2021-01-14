const crypto = require("crypto");
const search = require("libnpmsearch");

exports.sourceNodes = async ({ actions, cache }, configOptions) => {
  const { createNode } = actions;
  const currentCache = await cache.get(`gatsby-source-npm-author-packages`);
  let data = [];
  if (currentCache) {
    console.log("🔥 Using cached data for NPM packages ");
    data = JSON.parse(currentCache);
  } else {
    console.log("🚀 Getting NPM packages");
    let result = await search(
      `${configOptions.author ? `author:${configOptions.author}` : ``} ${
        configOptions.maintainer ? `maintainer:${configOptions.maintainer}` : ``
      }`
    );
    data = result;
    console.log("💾 Caching NPM packages");
    return cache.set(
      `gatsby-source-npm-author-packages`,
      JSON.stringify(result)
    );
  }

  for (let result of data) {
    const { name, description, links, version, keywords } = result;
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
    });
  }
};

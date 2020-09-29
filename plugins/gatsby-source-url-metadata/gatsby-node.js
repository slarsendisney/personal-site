const crypto = require("crypto");
const { getMetadata } = require("page-metadata-parser");
const domino = require("domino");

const got = require("got");

function checkCacheValid(cache, urls) {
  if (cache.every((r) => urls.includes(r))) {
    return true;
  }
  return false;
}

exports.sourceNodes = async ({ actions, cache }, configOptions) => {
  const { createNode } = actions;
  const { urls } = configOptions;
  const currentCache = await cache.get(`gatsby-source-metadata-urls`);
  if (currentCache && checkCacheValid(JSON.parse(currentCache).urls, urls)) {
    console.log("🔥 Using cached metadata for urls");
    JSON.parse(currentCache).metaData.forEach((site) => {
      createNode({
        ...site,
        id: site.suppliedUrl,
        internal: {
          type: `MetaData`,
          mediaType: `text/plain`,
          contentDigest: crypto
            .createHash(`md5`)
            .update(JSON.stringify(site))
            .digest(`hex`),
          description: `MetaData For URL`,
        },
      });
    });
  } else {
    Promise.all(
      urls.map((suppliedUrl) => {
        let actualUrl = suppliedUrl;
        if (!actualUrl.match(/^[a-zA-Z]+:\/\//)) {
          actualUrl = "http://" + actualUrl;
        }
        return got(actualUrl).then(({ body: html, url }) => {
          const doc = domino.createWindow(html).document;
          return { ...getMetadata(doc, url), suppliedUrl };
        });
      })
    )
      .then((metaData) => {
        metaData.forEach((site) => {
          createNode({
            ...site,
            id: site.suppliedUrl,
            internal: {
              type: `MetaData`,
              mediaType: `text/plain`,
              contentDigest: crypto
                .createHash(`md5`)
                .update(JSON.stringify(site))
                .digest(`hex`),
              description: `MetaData For URL`,
            },
          });
        });
        return metaData;
      })
      .then((metaData) => {
        console.log("💾 Caching metadata for urls");
        cache.set(
          `gatsby-source-metadata-urls`,
          JSON.stringify({
            metaData,
            urls,
          })
        );
      });
  }
};

const crypto = require("crypto");
const { getMetadata } = require("page-metadata-parser");
const domino = require("domino");

const got = require("got");

exports.sourceNodes = async ({ actions }, configOptions) => {
  const { createNode } = actions;
  const { urls } = configOptions;
  Promise.all(
    urls.map((suppliedUrl) => {
      let actualUrl = suppliedUrl;
      if (!actualUrl.match(/^[a-zA-Z]+:\/\//)) {
        actualUrl = "http://" + actualUrl;
      }
      return got(actualUrl).then(({ body: html, url }) => {
        console.log(`Retreiving metadata for ${actualUrl}`);
        const doc = domino.createWindow(html).document;
        return { ...getMetadata(doc, url), suppliedUrl };
      });
    })
  ).then((metaData) => {
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
  });
};

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

import React from "react";
import ReactDOMServer from "react-dom/server";

import Overlay from "./overlay";

// Default background from: https://pixabay.com/photos/lake-water-wave-mirroring-texture-2063957/
// Only used if nothing specified by options, or node.frontmatter.cover
const defaultBackgroundImage = path.join(
  __dirname,
  "./img/default-background.jpg"
);

export async function generateCard(
  {
    title = "",
    subtitle = "",
    tags = [],
    type,
    timeToRead = 2,
    backgroundImage = defaultBackgroundImage,
    noMeta,
  },
  oname
) {
  if (!fs.existsSync(backgroundImage)) {
    backgroundImage = defaultBackgroundImage;
  }

  const svgbuffer = Buffer.from(
    ReactDOMServer.renderToStaticMarkup(
      <Overlay
        title={title}
        subtitle={subtitle}
        tags={tags}
        timeToRead={timeToRead}
        type={type}
        noMeta={noMeta}
      />
    )
  );

  const infile = new fs.ReadStream(backgroundImage);
  const ostream = fs.WriteStream(oname);

  try {
    const overlayer = sharp()
      .resize({ width: 1200, height: 630 })
      .composite([{ input: svgbuffer, blend: "over" }])
      .jpeg();

    const res = infile.pipe(overlayer).pipe(ostream);
    return res;
  } catch (err) {
    console.error("Failed to generated card image width Sharp", svgBuffer);
    throw new Error("Failed to generated SVG image");
  }
}

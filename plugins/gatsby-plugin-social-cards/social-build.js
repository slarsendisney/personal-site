"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.generateCard = generateCard;

var _react = _interopRequireDefault(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _overlay = _interopRequireDefault(require("./overlay"));

const sharp = require("sharp");

const fs = require("fs");

const path = require("path");

const buffer = require("buffer");

// Default background from: https://pixabay.com/photos/lake-water-wave-mirroring-texture-2063957/
// Only used if nothing specified by options, or node.frontmatter.cover
const defaultBackgroundImage = path.join(__dirname, "./img/default-background.jpg");

async function generateCard({
  title = "",
  subtitle = "",
  backgroundImage = defaultBackgroundImage,
  authorImage64,
  design = "default" // default, card, split

}, oname) {
  if (!fs.existsSync(backgroundImage)) {
    backgroundImage = defaultBackgroundImage;
  }

  const svgbuffer = Buffer.from(_server.default.renderToStaticMarkup( /*#__PURE__*/_react.default.createElement(_overlay.default, {
    title: title,
    subtitle: subtitle,
    authorImage64: authorImage64
  })));
  const infile = new fs.ReadStream(backgroundImage);
  const ostream = fs.WriteStream(oname);

  try {
    const overlayer = sharp().resize({
      width: 1200,
      height: 630
    }).composite([{
      input: svgbuffer,
      blend: "over"
    }]).jpeg();
    const res = infile.pipe(overlayer).pipe(ostream);
    return res;
  } catch (err) {
    console.error("Failed to generated card image width Sharp", svgBuffer);
    throw new Error("Failed to generated SVG image");
  }
}
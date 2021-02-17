const fs = require("fs");
const nodePath = require("path");
const os = require("os");
const { bundle } = require("@remotion/bundler");
const {
  getCompositions,
  renderFrames,
  stitchFramesToVideo,
} = require("@remotion/renderer");
const replaceAll = require("replaceall");

const manifest = require("./manifest.json");

let bundled;
let comps;

const builtPrior = fs.readdirSync("./static/video").map((file) => {
  return file.replace(".mp4", "");
});

const prep = async () => {
  // Create a webpack bundle of the entry file.
  bundled = await bundle(require.resolve("./src/index.tsx"));
  // Extract all the compositions you have defined in your project
  // from the webpack bundle.
  comps = await getCompositions(bundled);
};

const generateVideo = async ({ type, path, ...otherProps }) => {
  // The composition you want to render
  const compositionId = type;

  let actualpath =
    path.charAt(0) !== "/"
      ? replaceAll("/", "-", path)
      : replaceAll("/", "-", path).substring(1);
  
  if(builtPrior.includes(actualpath)){
    console.log(`Already Built ${path}`)
    return
  }
  console.log(`Creating Video for ${path}`);

  // Select the composition you want to render.
  const video = comps.find((c) => c.id === compositionId);

  // We create a temporary directory for storing the frames of the video
  const framesDir = await fs.promises.mkdtemp(
    nodePath.join(os.tmpdir(), "remotion-")
  );
  // We create PNGs for all frames
  await renderFrames({
    config: video,
    // Path of the webpack bundle you have created
    webpackBundle: bundled,
    // Get's called after bundling is finished and the
    // actual rendering starts.
    onStart: () => console.log("Rendering frames..."),
    // How many CPU threads to use. `null` will use a sane default (half of the available threads)
    onFrameUpdate: () => {},
    // See 'CLI options' section for concurrency options.
    parallelism: null,
    outputDir: framesDir,
    // React props passed to the root component of the sequence. Will be merged with the `defaultProps` of a video.
    userProps: otherProps,
    compositionId,
    // Can be either 'jpeg' or 'png'. JPEG is faster, but has no transparency.
    imageFormat: "jpeg",
  });
  console.log(`Rendered Video frames!`);

  fs.renameSync(
    nodePath.join(framesDir, "element-100.jpeg"),
    nodePath.join(__dirname, "..", "/static/covers", `${actualpath}.jpeg`)
  );
  console.log(`Grabbed og:image`);

  // Add this step if you want to make an MP4 out of the rendered frames.
  await stitchFramesToVideo({
    // Input directory of the frames
    dir: framesDir,
    // Overwrite existing video
    force: true,
    // Possible overwrite of video metadata,
    // we suggest to just fill in the data from the
    // video variable
    fps: video.fps,
    height: video.height,
    width: video.width,
    // Must match the value above for the image format
    imageFormat: "jpeg",
    // Pass in the desired output path of the video. Et voilà!
    outputLocation: nodePath.join(
      __dirname,
      "..",
      "/static/video",
      `${actualpath}.mp4`
    ),
  });
  console.log(`Grabbed og:video`);
  return;
};

async function start() {
  await prep();
  for (const item of manifest) {
    await generateVideo(item);
  }
}
start().then(() => {
  process.exit(0);
});

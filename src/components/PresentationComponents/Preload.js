import React from "react";
import * as exports from "./gifs";

export default ({ images }) => {
  console.log(typeof images);
  if (images) {
    return (
      <>
        {images.map(item => (
          <img src={item} style={{ height: 0, width: 0 }} />
        ))}
      </>
    );
  }
  return (
    <>
      {Object.entries(exports).map(([name, exported]) => {
        return <img src={exported} style={{ height: 0, width: 0 }} />;
      })}
    </>
  );
};

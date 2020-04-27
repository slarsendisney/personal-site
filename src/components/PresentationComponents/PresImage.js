import React from "react";

export default ({ image }) => (
  <img
    src={image}
    alt="Slide Img"
    style={{ maxHeight: "100vh", maxWidth: "100vw" }}
  />
);

import React from "react";
import Lottie from "react-lottie";
import data from "./logo.json";

const Logo = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <span title="Home">
      <Lottie
        isClickToPauseDisabled={true}
        options={defaultOptions}
        width={"51px"}
        height={"23px"}
      />
    </span>
  );
};

export default Logo;

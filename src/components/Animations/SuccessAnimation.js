import React from "react";
import Lottie from "react-lottie";
import data from "../../animation-data/success.json";

export default ({ backgroundColourClassName }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <span
      title="Success"
      style={{
        position: "absolute",
        zIndex: 1000,
        top: -60,
        left: -60,
        borderRadius: "50%",
      }}
      className={`${
        backgroundColourClassName ? backgroundColourClassName : "bg-default"
      }`}
    >
      <Lottie
        isClickToPauseDisabled={true}
        options={defaultOptions}
        width={120}
        height={120}
      />
    </span>
  );
};

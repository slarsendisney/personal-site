import React from "react"
import Lottie from "react-lottie"
import data from "../data/confetti.json"

export default () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <span title="Home">
      <Lottie
        isClickToPauseDisabled={true}
        options={defaultOptions}
        width={"100%"}
      />
    </span>
  )
}

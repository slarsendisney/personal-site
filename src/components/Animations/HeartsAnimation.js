import React from "react"
import Lottie from "react-lottie"
import data from "../../data/hearts.json"

export default () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <span>
      <Lottie
        isClickToPauseDisabled={true}
        options={defaultOptions}
        width={"100%"}
      />
    </span>
  )
}

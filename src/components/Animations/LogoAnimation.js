import React from "react"
import Lottie from "react-lottie"
import data from "../../animation-data/logo.json"
import dataDark from "../../animation-data/logo-dark.json"

export default ({ darkMode }) => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: darkMode ? dataDark : data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <span title="Home">
      <Lottie
        isClickToPauseDisabled={true}
        options={defaultOptions}
        width={"51px"}
        height={"23px"}
      />
    </span>
  )
}

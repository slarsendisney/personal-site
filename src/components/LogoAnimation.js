import React from "react"
import Lottie from "react-lottie"

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isStopped: false, isPaused: false }
  }

  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: require("../data/logo.json"),
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
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
          speed={0.1}
        />
      </span>
    )
  }
}

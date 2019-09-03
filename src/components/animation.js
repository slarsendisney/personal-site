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
      animationData: require("../data/Start.json"),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }

    return (
      <Lottie
        isClickToPauseDisabled={true}
        options={defaultOptions}
        width={"100%"}
        height={"99vh"}
        isStopped={this.state.isStopped}
        isPaused={this.state.isPaused}
      />
    )
  }
}

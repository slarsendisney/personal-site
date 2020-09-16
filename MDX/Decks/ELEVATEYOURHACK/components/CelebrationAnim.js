import React from "react"
import Lottie from "react-lottie"

export default class LottieControl extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isStopped: false, isPaused: false }
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: require("../../../../src/components/Presentations/animations/celebration.json"),
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }

    return (
      <div
        style={{
          width: 200,
          marginTop: -250,
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Lottie
          isClickToPauseDisabled={true}
          options={defaultOptions}
          isStopped={this.state.isStopped}
          isPaused={this.state.isPaused}
        />
      </div>
    )
  }
}

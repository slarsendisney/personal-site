import React, { useState } from "react"
import Radium, { StyleRoot } from "radium"
import { fadeOut, fadeIn } from "react-animations"
import GoodBadExample from "./GoodBadExample"
import CelebrationAnim from "./CelebrationAnim"
const Bad = () => {
  const [showMessage, setShowMessage] = useState(false)

  return (
    <>
      {showMessage ? (
        <h4 className="margin-0 pad-0 is-white">Thanks!</h4>
      ) : (
        <h4 className="margin-0">{` `}</h4>
      )}
      <button
        className="btn margin-10"
        onClick={() => setShowMessage(!showMessage)}
      >
        <h5 className="margin-0">Click Me!</h5>
      </button>
    </>
  )
}

const Good = () => {
  const [showButton, setShowButton] = useState(true)
  const [showThanks, setShowThanks] = useState(false)

  const styles = {
    fadeOut: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeOut, "fadeOut"),
    },
    fadeIn: {
      animation: "x 1s",
      animationName: Radium.keyframes(fadeIn, "fadeIn"),
    },
  }

  const clicked = () => {
    setShowButton(!showButton)
    setTimeout(() => {
      setShowThanks(true)
    }, 800)
  }
  const revert = () => {
    setShowButton(true)
    setShowThanks(false)
  }

  if (showThanks) {
    return (
      <StyleRoot>
        <div
          className="is-white-bg pad-10"
          style={{ borderRadius: 8, textAlign: "center", ...styles.fadeIn }}
        >
          <CelebrationAnim />
          <h5 className="is-grey margin-0">
            You just made one great click in an awesome journey.
          </h5>
          <p className="is-grey margin-0 margin-1-t" style={{ fontSize: 20 }}>
            Need another go?{" "}
            <a
              className="is-pink"
              style={{ cursor: "pointer" }}
              onClick={() => revert()}
            >
              Click here to reset.
            </a>
          </p>
        </div>
      </StyleRoot>
    )
  }
  return (
    <StyleRoot>
      <button
        className="btn margin-10"
        onClick={() => clicked()}
        style={!showButton ? styles.fadeOut : {}}
      >
        <h5 className="margin-0">Click Me!</h5>
      </button>
    </StyleRoot>
  )
}
export default () => (
  <GoodBadExample
    good={<Good />}
    bad={<Bad />}
    title="Create Delight"
    desc="Make users smile - give me a virtual 🙌 when I do something you and I agree is awesome."
  />
)

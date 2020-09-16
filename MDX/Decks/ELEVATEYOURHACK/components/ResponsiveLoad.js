import React, { useState, useEffect } from "react"
import Radium, { StyleRoot } from "radium"
import { fadeOut, fadeIn } from "react-animations"
import GoodBadExample from "./GoodBadExample"

import { Line } from "rc-progress"

const Bad = () => {
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const fakeLoad = () => {
    setLoading(true)
    setLoaded(false)
    setTimeout(() => {
      setLoaded(true)
      setLoading(false)
    }, 3000)
  }
  if (loaded) {
    return (
      <StyleRoot>
        <div
          className="is-pink-bg-always pad-10"
          style={{ borderRadius: 8, textAlign: "center" }}
        >
          <h5 className="is-grey margin-0">😭</h5>
          <h5 className="is-grey margin-0">
            When we click buttons, we expect instant gratification, this isn't
            doing it for me.
          </h5>
        </div>
      </StyleRoot>
    )
  }
  return (
    <>
      <button
        disabled={loading}
        className="bubble-button margin-10"
        onClick={() => fakeLoad()}
      >
        <h5 className="margin-0">Load Content</h5>
      </button>
    </>
  )
}

const ProgressBar = ({ complete }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prevCount => {
        const newVal = prevCount + Math.random() * 20
        if (newVal > 100) {
          return 100
        }
        return newVal
      }) // <-- Change this line!
    }, 500)
    return () => {
      clearInterval(timer)
    }
  }, [])

  if (progress === 100) {
    setTimeout(() => complete(), 300)
  }

  return (
    <div style={{ textAlign: "center" }} className="margin-1-b">
      <h5 className="margin-0 is-white" style={{ fontSize: 20 }}>
        {Math.floor(progress)}%
      </h5>
      <Line percent={progress} strokeWidth="4" strokeColor="#ffffff" />
    </div>
  )
}

const Good = () => {
  const [showButton, setShowButton] = useState(true)
  const [loading, setLoading] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const fakeLoad = () => {
    setLoading(true)
  }

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
    setShowButton(false)
    setTimeout(() => fakeLoad(), 800)
  }

  if (loaded) {
    return (
      <StyleRoot>
        <div
          className="is-white-bg pad-10"
          style={{ borderRadius: 8, textAlign: "center", ...styles.fadeIn }}
        >
          <h5 className="is-grey margin-0">❤️</h5>
          <h5 className="is-grey margin-0">
            The UI reacted and I understood it was loading content.
          </h5>
        </div>
      </StyleRoot>
    )
  }

  if (loading) {
    return (
      <StyleRoot>
        <div
          className=" pad-10"
          style={{ textAlign: "center", ...styles.fadeIn }}
        >
          <ProgressBar complete={() => setLoaded(true)} />
          <h5 className="is-white margin-0" style={{ fontSize: 20 }}>
            Now loading your awesome content...
          </h5>
        </div>
      </StyleRoot>
    )
  }
  return (
    <StyleRoot>
      <button
        className="bubble-button margin-10"
        onClick={() => clicked()}
        style={!showButton ? styles.fadeOut : {}}
      >
        <h5 className="margin-0">Load Content</h5>
      </button>
    </StyleRoot>
  )
}
export default () => (
  <GoodBadExample
    good={<Good />}
    bad={<Bad />}
    title="Responsive Feedback"
    desc="Give me progress indicators if things are taking time."
  />
)

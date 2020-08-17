import React, { useState, useRef } from "react"
import { Helmet } from "react-helmet"
import ConfettiAnimation from "../Animations/ConfettiAnimation"

export default ({ children }) => {
  const [showConfetti, setShowConfetti] = useState(true)

  const restart = (e) => {
    e.preventDefault()
    setShowConfetti(false)
    setTimeout(() => {
      setShowConfetti(true)
      if (typeof document !== "undefined") {
        document.getElementById("gatsby-focus-wrapper").focus()
      }
    }, 100)
  }
  return (
    <>
      {showConfetti && (
        <div className="firework-window">
          <ConfettiAnimation />
        </div>
      )}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative",
          top: 0,
          left: 0,
        }}
        className="flex align-horizontal align-vertical"
      >
        {children}

        <button
          className="bubble-button border-radius grow pad-1-tb pad-2-lr"
          style={{ position: "absolute", bottom: 50 }}
          onClick={restart}
        >
          <p className="legal is-white-always">More 🎉</p>
        </button>
      </div>
    </>
  )
}

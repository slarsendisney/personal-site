import React, { useState, useEffect } from "react"
import { Emojione } from "react-emoji-render"

export default ({ x, y, index }) => {
  const [isStopped, setStopped] = useState(false)

  useEffect(() => {
    console.log(x, y)
    // setTimeout(() => {
    //   setStopped(true)
    //   //removeCB();
    // }, 2000)
  }, [])

  const happyFaceToRender = () => {
    switch (index % 3) {
      case 1:
        return "🎉"
      case 2:
        return "☕️"
      default:
        return "😍"
    }
  }
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        display: `${isStopped ? "none" : "block"}`,
      }}
      className={`emoji-thanks `}
    >
      <Emojione text={happyFaceToRender()} />
    </div>
  )
}

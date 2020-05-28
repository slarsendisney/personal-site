import React, { useState } from "react"
import ButtonMash from "react-mash"

const mashStyles = { transform: "scale(1.5, 1.5)", backgroundColor: "#ea4e68" }

export default () => {
  const [mashed, setMashed] = useState(false)
  const [count, setCount] = useState(0)

  const wasMashed = () => {
    setMashed(true)
    setTimeout(() => setMashed(false), 4000)
  }
  return (
    <div className="flex align-horizontal align-vertical">
      <ButtonMash
        className="is-special-blue-bg is-white pad-5 border-radius grow"
        onClick={() => setCount(count + 1)}
        onMash={wasMashed}
        style={mashed ? mashStyles : {}}
        clicks={8}
        interval={2000}
      >
        {mashed ? "MASHED" : "MASH ME"}
      </ButtonMash>
      <p>Clicked {count} times</p>
    </div>
  )
}

import React from "react"
import useMousePosition from "./useMousePosition"
import first from "./1.svg"
import second from "./2.svg"
import third from "./3.svg"
import four from "./4.svg"
export default () => {
  const { x, y } = useMousePosition()
  const getImage = () => {
    const width = window.innerWidth
    if (x / width < 0.25) {
      return first
    }
    if (x / width < 0.5) {
      return second
    }
    if (x / width < 0.75) {
      return third
    }
    return four
  }
  return (
    <div className="row is-special-blue-bg is-white pad-10-tb">
      <div
        className="col-xs-12 flex align-vertical align-horizontal"
        style={{ justifyContent: "center" }}
      >
        <img src={getImage()} style={{ height: 100 }} />
        <h1>
          {x}, {y}
        </h1>
        <h4>
          {window.innerWidth},{window.innerHeight}
        </h4>
      </div>
      <div className="col-xs-12 flex" style={{ textAlign: "center" }}></div>
    </div>
  )
}

import React from "react"
import useMousePosition from "./useMousePosition"
import first from "./heads/6.png"
import second from "./heads/7.png"
import third from "./heads/8.png"
import four from "./heads/9.png"
import fifth from "./heads/10.png"
import firstDown from "./heads/1.png"
import secondDown from "./heads/2.png"
import thirdDown from "./heads/3.png"
import fourDown from "./heads/4.png"
import fifthDown from "./heads/5.png"
export default () => {
  const { x, y } = useMousePosition()
  const getImage = () => {
    const width = window.innerWidth
    if (!x) {
      return third
    }
    if (y > 420) {
      if (x / width < 0.2) {
        return firstDown
      }
      if (x / width < 0.4) {
        return secondDown
      }
      if (x / width < 0.6) {
        return thirdDown
      }
      if (x / width < 0.8) {
        return fourDown
      }
      return fifthDown
    }

    if (x / width < 0.2) {
      return first
    }
    if (x / width < 0.4) {
      return second
    }
    if (x / width < 0.6) {
      return third
    }
    if (x / width < 0.8) {
      return four
    }
    return fifth
  }
  return (
    <div className="row is-white pad-10-tb">
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

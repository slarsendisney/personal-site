import React from "react"
import * as exports from "./gifs"

export default ({ images }) => {
  if (images) {
    return (
      <>
        {images.map((item) => (
          <img
            alt="Pres"
            src={item}
            key={item}
            style={{ height: 0, width: 0 }}
          />
        ))}
      </>
    )
  }
  return (
    <>
      {Object.entries(exports).map(([name, exported]) => {
        return (
          <img
            alt="Pres"
            src={exported}
            key={exported}
            style={{ height: 0, width: 0 }}
          />
        )
      })}
    </>
  )
}

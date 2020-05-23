import React, { useState } from "react"
import { useScrollYPosition } from "react-use-scroll-position"
import { useWindowSize, useLocalStorage } from "../../utils/customHooks"

export default ({ children }) => {
  const size = useWindowSize()
  const scrollY = useScrollYPosition()

  if (size.width < 991) {
    return <div className="margin-1-l">{children}</div>
  }

  return (
    <div
      style={{
        position: "fixed",
        top: Math.max(0, 105 - scrollY),
      }}
    >
      {children}
    </div>
  )
}

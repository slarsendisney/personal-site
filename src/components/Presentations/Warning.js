import React from "react"
import WarningAnimation from "../Animations/WarningAnimation"

export default ({ content, backgroundColourClassName }) => {
  return (
    <div className=" is-yellow-bg is-grey pres-warning flex align-horizontal align-vertical pad-8-tb pad-10-lr">
      <WarningAnimation backgroundColourClassName={backgroundColourClassName} />
      <p className="margin-0">{content}</p>
    </div>
  )
}

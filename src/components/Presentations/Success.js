import React from "react"
import SuccessAnimation from "../Animations/SuccessAnimation"

export default ({ content, backgroundColourClassName }) => {
  return (
    <div className=" is-project-tag-bg pres-warning flex align-horizontal align-vertical pad-8-tb pad-10-lr">
      <SuccessAnimation backgroundColourClassName={backgroundColourClassName} />
      <p className="margin-0 is-white-always">{content}</p>
    </div>
  )
}

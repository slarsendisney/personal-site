import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import { Emojione } from "react-emoji-render"

export const NavLinkSmall = ({ label, desc, url }) => {
  if (url.includes("http")) {
    return (
      <div className=" ">
        <OutboundLink
          href={url}
          // target="_blank"
          // rel="noopener noreferrer"
          className="margin-15-b"
          id="path"
        >
          <h3 className="margin-3-b margin-0-t link-bar pad-1-b special-header-text">
            <Emojione text={label} />
          </h3>
        </OutboundLink>
      </div>
    )
  } else {
    const currentLocation =
      typeof window !== "undefined" && window.location.pathname === url
    if (currentLocation) {
      return (
        <div style={{ cursor: "default" }}>
          <h3
            className={`margin-0-tb pad-1-b is-special-blue special-header-text`}
          >
            <Emojione text={label} />
          </h3>
        </div>
      )
    }
    return (
      <Link to={url} className="margin-15-b" id="path">
        <div className="  ">
          <h3 className={`margin-0-tb link-bar pad-1-b  special-header-text`}>
            <Emojione text={label} />
          </h3>
        </div>
      </Link>
    )
  }
}
export default ({ label, desc, url }) => {
  if (url.includes("http")) {
    return (
      <div className=" ">
        <OutboundLink
          href={url}
          // target="_blank"
          // rel="noopener noreferrer"
          className="margin-15-b"
          id="path"
        >
          <h1 className="margin-3-b margin-0-t link-bar pad-1-b">
            <Emojione text={label} />
          </h1>
        </OutboundLink>
      </div>
    )
  } else {
    return (
      <Link to={url} className="margin-15-b" id="path">
        <div className="  ">
          <h1 className="margin-3-b margin-0-t link-bar pad-1-b">
            <Emojione text={label} />
          </h1>
        </div>
      </Link>
    )
  }
}

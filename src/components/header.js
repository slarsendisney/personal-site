import { Link } from "gatsby"
import React from "react"
import Logo from "../images/Logo.svg"

export default () => (
  <div className="is-white-bg margin-5">
    <div className="row flex padding-0-tb container-small">
      <div className="col-xs-9 flex">
        <Link
          to="/start"
          className=" align-horizontal is-white flex"
          style={{ textDecoration: "none" }}
        >
          <img src={Logo} alt="" height={20} style={{}} />
        </Link>
      </div>
      <div
        className="col-xs-3 flex text-align-right"
        style={{ justifyContent: "flex-end" }}
      >
        <Link
          to="/portfolio"
          style={{ textDecoration: "none" }}
          className=" align-horizontal is-grey lato margin-4-r"
        >
          <p className="link">PORTFOLIO</p>
        </Link>
        <Link
          to="/blog/"
          style={{ textDecoration: "none" }}
          className=" align-horizontal is-grey  margin-4-r lato"
        >
          <p className="link">BLOG</p>
        </Link>
      </div>
    </div>
  </div>
)

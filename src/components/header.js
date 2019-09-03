import { Link } from "gatsby"
import React from "react"
import Logo from "../images/Logo.svg"

export default () => (
  <div
    className="is-dark-blue-bg"
    style={{ height: 40, padding: 5, paddingBottom: 20, marginBottom: 30 }}
  >
    <div className="row flex padding-0-t">
      <Link
        to="/start"
        className=" align-horizontal is-white col-xs-9 flex"
        style={{ textDecoration: "none" }}
      >
        <img src={Logo} alt="" height={20} style={{}} />

        <h6 clasName="nav-text" style={{ marginLeft: 8 }}>
          | Samuel Larsen-Disney
        </h6>
      </Link>
      <div
        className="col-xs-3 flex text-align-right"
        style={{ justifyContent: "flex-end" }}
      >
        <Link
          to="/portfolio"
          style={{ textDecoration: "none" }}
          className=" align-horizontal is-white lato margin-4-r"
        >
          <p className="link">PORTFOLIO</p>
        </Link>
        <Link
          to="/blog"
          style={{ textDecoration: "none" }}
          className=" align-horizontal is-white  margin-4-r lato"
        >
          <p className="link">BLOG</p>
        </Link>
      </div>
    </div>
  </div>
)

import { Link } from "gatsby"
import React from "react"
import Logo from "../images/Logo.svg"

export default () => (
  <div
    className="is-dark-blue-bg "
    style={{ height: 20, padding: 15, paddingBottom: 20, marginBottom: 30 }}
  >
    <Link
      to="/start"
      className="flex align-horizontal is-white"
      style={{ textDecoration: "none" }}
    >
      <img src={Logo} alt="" height={20} style={{}} />

      <h6 clasName="nav-text" style={{ marginLeft: 8 }}>
        | Samuel Larsen-Disney
      </h6>
    </Link>
  </div>
)

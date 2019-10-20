import { Link } from "gatsby"
import React from "react"
import useDarkMode from "use-dark-mode"
import Logo from "../images/Logo.svg"

export default () => {
  const darkMode = useDarkMode(false)
  return (
    <div className="is-white-bg pad-5">
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
          {darkMode.value ? (
            <button type="button" onClick={darkMode.disable}>
              <span role="img" aria-label="light-mode">
                🔆
              </span>
            </button>
          ) : (
            <button type="button" onClick={darkMode.enable}>
              <span role="img" aria-label="dark-mode">
                🌙
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

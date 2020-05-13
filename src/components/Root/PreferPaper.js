import React from "react"
import { Link } from "gatsby"

export default ({ darkMode }) => (
  <div
    className="is-white-always is-hero-blue-bg"
    style={{ position: "relative" }}
  >
    <div
      className="row container-small pad-20-tb"
      style={{ position: "relative", zIndex: 5 }}
    >
      <div className="col-xs-12 text-align-center">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="">For The People Who Prefer Paper</h1>
          </div>
          <div className="col-xs-12">
            <Link to="/cv">
              <button
                className="bubble-button "
                style={{
                  minWidth: 300,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                View CV
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
)

import React from "react"
import { Link } from "gatsby"

export default ({ darkMode }) => (
  <div className="is-grey is-light-grey-bg" style={{ position: "relative" }}>
    <img
      alt="planes"
      src={
        !darkMode.value
          ? "https://ik.imagekit.io/sld/Untitled_Artwork_9_oDFR_CBToKE.gif"
          : "https://ik.imagekit.io/sld/Untitled_Artwork_10_46sRVmnPyiG.gif"
      }
      style={{
        width: "100%",
        maxHeight: "100%",
        objectFit: "cover",
        position: "absolute",
        zIndex: 0,
      }}
    />

    <div
      className="row container-small pad-20-tb"
      style={{ position: "relative", zIndex: 5 }}
    >
      <div className="col-xs-12 text-align-center">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="is-grey">For The People Who Prefer Paper</h1>
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

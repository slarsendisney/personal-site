import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"

export default ({ data }) => (
  <>
    <div className="is-grey is-light-grey-bg pad-10-b">
      <div className="row container pad-5-lr pad-10-t pad-20-b">
        <div className="col-xs-12 col-md-7 ">
          <h1 className="is-hero-menu margin-0-t">Hey</h1>
          <div className="line margin-3-t margin-10-b" />
        </div>
      </div>
    </div>
    <div className="pad-10-t pad-10-b is-hero-blue-bg is-white-always is-black">
      <div className="row container ">
        <div className="col-xs-12 text-align-center pad-5-lr">
          <Img
            fluid={data.file.childImageSharp.fluid}
            style={{
              height: 100,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />
          <h1 className="is-hero-menu  margin-0">I'm Sam Larsen-Disney</h1>
          <h3 className="margin-0 pad-0">Designer. Engineer. Creator.</h3>
          <Link to="/cv">
            <button
              className="bubble-button border-radius margin-10-t"
              style={{
                minWidth: 300,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              VIEW CV
            </button>
          </Link>
        </div>
      </div>
    </div>
  </>
)

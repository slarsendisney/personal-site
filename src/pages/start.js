import React, { useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import face from "../images/face.png"
import Timeline from "../components/Timeline"
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="row fade-in">
        <div className="col-xs-12 text-align-center pad-6-t">
          <img
            src={face}
            width="300px"
            style={{ width: "50%", maxWidth: "300px", minWidth: "150px" }}
          />
          <p className="is-hero-menu">Samuel Larsen-Disney</p>
          <div className="container">
            <hr />
          </div>
          <h4 className="is-hero-sub-text">
            Design Engineer working @ <br />
            <span
              style={{ color: "#046ED0", cursor: "pointer" }}
              onClick={() => {
                window.open("https://www.americanexpress.com", "_blank")
              }}
            >
              {" "}
              American Express.
            </span>
          </h4>
        </div>
        <Timeline />
      </div>
    </Layout>
  )
}

export default IndexPage

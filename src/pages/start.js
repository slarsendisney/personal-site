import React, { useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import face from "../data/face.png"
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div
        className="row start-background fade-in"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-xs-12 text-align-center">
          <img src={face} width="300px" />
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
          <div className="btn">About Me</div>
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage

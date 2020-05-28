import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => {
  return (
    <Layout>
      <SEO title={"404"} />
      <div
        className="is-pink-always is-light-grey-bg"
        style={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="row container-small pad-20-tb ">
          <div className="col-xs-12 col-md-8 pad-10-lr">
            <h6 className="is-hero-sub-text is-black margin-3-b">
              Did I really just hit a dead link?
            </h6>
            <p className="is-hero-menu margin-3-t is-special-blue margin-3-b">
              Yep, you're lost. ⚡️
            </p>
            <h6 className="is-hero-sub-text is-black margin-10-b">
              Click your heels together three times and say 'There's no place
              like home', press the button below, and you'll be there.
            </h6>

            <Link
              to={"/"}
              style={{ textDecoration: "none" }}
              className=" align-horizontal is-white lato margin-4-r"
            >
              <button className="bubble-button border-radius">
                There's no place like home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

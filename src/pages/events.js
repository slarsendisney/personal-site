import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => {
  return (
    <Layout>
      <SEO title="Events" />
      <div className="is-grey is-light-grey-bg pad-10-b">
        <div className="row container pad-3-lr pad-10-t pad-20-b">
          <div className="col-xs-12 ">
            <h1 className="is-hero-menu margin-0-t">Events</h1>
            <div className="line margin-3-t margin-10-b" />
          </div>
        </div>
      </div>
    </Layout>
  )
}

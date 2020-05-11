import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"

export default () => {
  return (
    <Layout>
      <SEO title="Disclaimer" description="My site disclaimer." />
      <div className="row container pad-10-t pad-3-lr">
        <div className="col-xs-12  is-grey">
          <h1 className="margin-2-t">
            All views expressed on this site are my own and do not represent the
            opinions of any entity whatsover with which I have been, am now or
            will be affiliated with.
          </h1>
        </div>
      </div>
    </Layout>
  )
}

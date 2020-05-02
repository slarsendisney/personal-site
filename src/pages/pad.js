import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import Editor from "../components/LiveEditor/Editor"

export default () => {
  return (
    <Layout>
      <SEO title="Code Pad" />
      <div className="container">
        <div className="pad-5-t margin-3-lr">
          <p className="is-grey">
            This pad is here to help me demo react concepts quickly. Feel free
            to have a go!
          </p>
        </div>
        <Editor large previewClassNames="is-white-bg-always" />
      </div>
    </Layout>
  )
}

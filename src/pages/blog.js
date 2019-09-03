import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPage = () => (
  <Layout>
    <SEO title="Blog" />
    <div className="row">
      <div className="col-xs-10 col-sm-3 ">
        <div
          className="flex align-vertical text-align-right margin-5-r"
          style={{ minHeight: "100vh" }}
        >
          <h1 className="margin-0">Blog</h1>
          <h6 className="margin-0 is-pink">Samuel Larsen Disney</h6>
        </div>
      </div>
      <div className="col-xs-12 col-sm-7" style={{ overflowY: "scroll" }}>
        <div className="row pad-4">
          <h5 className="margin-0 is-pink">TestTitle</h5>
          <div className="col-xs-10">
            <p className="margin-0">This is a test blog description</p>
          </div>
          <div className="col-xs-2">
            <p>09/09/19</p>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)
export default BlogPage

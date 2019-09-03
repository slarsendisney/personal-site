import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import notFound from "../images/404.svg"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div
      style={{ textAlign: "center", minHeight: "87vh" }}
      className="margin-6-b"
    >
      <img src={notFound} height={300} />
      <h6 className="lato margin-3-b">
        You just hit a route that doesn&#39;t exist... the sadness.
      </h6>
      <Link
        to="/start"
        style={{ textDecoration: "none" }}
        className=" align-horizontal is-white lato margin-4-r"
      >
        <div className="btn"> Take Me Home</div>
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage

import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const { mdx } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = mdx
  return (
    <Layout>
      <SEO title={frontmatter.answer} />
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
              {frontmatter.question.toUpperCase()}
            </h6>
            <p className="is-hero-menu margin-3-t margin-3-b">
              {frontmatter.answer}
            </p>
            <h6 className="is-hero-sub-text is-black margin-10-b">
              {frontmatter.desc}
            </h6>
            <div
              className={`${html ? "pad-20-b lato" : ""}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <Link
              to={frontmatter.link}
              style={{ textDecoration: "none" }}
              className=" align-horizontal is-white lato margin-4-r"
            >
              <button className="bubble-button">{frontmatter.btnLabel}</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        question
        answer
        link
        btnLabel
        desc
      }
    }
  }
`

import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function QandATemplate({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <SEO title="Hell Yeah" />
      <div className="is-grey is-light-grey-bg">
        <div className="row container-small pad-20-t pad-20-b ">
          <div className="col-xs-8 pad-10-l">
            <h6 className="is-hero-sub-text margin-3-b">
              {frontmatter.question.toUpperCase()}
            </h6>
            <h6 className="is-hero-menu is-pink margin-10-b">
              {frontmatter.answer}
            </h6>
            <h6 className="is-hero-sub-text margin-3-b">{frontmatter.desc}</h6>
            <Link
              to="/start"
              style={{ textDecoration: "none" }}
              className=" align-horizontal is-white lato margin-4-r"
            >
              <div className="btn">Meet Sam</div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        question
        answer
        desc
      }
    }
  }
`

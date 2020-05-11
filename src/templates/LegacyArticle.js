import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Like from "../components/Articles/StickyLike"
import ArticleShareOptions from "../components/Articles/ArticleShareOptions"

export default function QandATemplate({ location, data }) {
  const { markdownRemark } = data
  const { frontmatter, html, excerpt } = markdownRemark
  return (
    <Layout>
      <SEO title={frontmatter.title} description={excerpt} />
      <div
        className="is-grey is-light-grey-bg"
        style={{ position: "relative" }}
      >
        <div className="row container pad-10-t ">
          <div className="col-xs-12 pad-3-lr">
            <Link to="/articles" className="link">
              <h2 className="is-grey margin-0 margin-2-b link-bar pad-1-b">{`< Articles`}</h2>
            </Link>
          </div>
          <div className="col-xs-12 pad-3-lr">
            <h1 className="is-hero-menu  margin-1-t margin-5-b">
              {frontmatter.title}
            </h1>
            <h6 className="is-hero-sub-text margin-3-b">{frontmatter.desc}</h6>
            <div className="line margin-5-t margin-5-b" />
            <div
              className={`${html ? "pad-10-b lato article" : ""}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          <div className="col-xs-12 pad-3-lr pad-5-b">
            <Like />
          </div>
          <div className="col-xs-12 pad-3-lr pad-5-b">
            <ArticleShareOptions location={location} />
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
        title
        desc
      }
      excerpt
    }
  }
`

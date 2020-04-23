import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleShareOptions from "../components/Articles/ArticleShareOptions"

export default ({ data, location }) => {
  const { feedMediumBlog } = data
  const { title, content, pubDate, fields } = feedMediumBlog

  let imgSrcRegex = /src\s*=\s*"(.+?)"/
  const found = content.encoded.match(imgSrcRegex)
  return (
    <Layout>
      <SEO
        title={title}
        description={fields.excerpt}
        image={found ? found[1] : undefined}
      />
      <div className="is-grey is-light-grey-bg">
        <div className="row container pad-10-t ">
          <div className="col-xs-12 pad-5-lr">
            <Link to="/articles" className="">
              <h2 className="is-grey margin-0 margin-2-b link-bar pad-1-b">{`< Articles`}</h2>
            </Link>
          </div>
          <div className="col-xs-12 pad-5-lr">
            <h1 className="is-hero-menu is-pink-always margin-1-t margin-5-b">
              {title}
            </h1>
            <h6 className="is-hero-sub-text margin-3-b">
              {pubDate.replace(
                /([0-9])([0-9]):([0-9])([0-9]):([0-9])([0-9]) ([A-Z])([A-Z])([A-Z])/g,
                ""
              )}
            </h6>
            <div className="line margin-5-tb" />
            <div
              className={`${content.encoded ? "lato article" : ""}`}
              dangerouslySetInnerHTML={{ __html: content.encoded }}
            />
          </div>
          <div className="col-xs-12 pad-5-lr pad-5-b">
            <ArticleShareOptions location={location} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    feedMediumBlog(fields: { slug: { eq: $slug } }) {
      link
      title
      pubDate
      fields {
        excerpt
      }
      content {
        encoded
      }
    }
  }
`

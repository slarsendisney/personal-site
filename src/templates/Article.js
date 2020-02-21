import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share"
export default ({ data, location }) => {
  const { feedMediumBlog } = data
  const { title, content, pubDate, fields } = feedMediumBlog
  return (
    <Layout>
      <SEO title={title} description={fields.excerpt} />
      <div className="is-grey is-light-grey-bg">
        <div className="row container pad-10-t ">
          <div className="col-xs-12 pad-10-lr">
            <Link to="/articles" className="link">
              <h2 className="is-grey margin-0 margin-2-b grow">{`< Articles`}</h2>
            </Link>
          </div>
          <div className="col-xs-12 pad-10-lr">
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
              className={`${content.encoded ? "pad-10-b lato article" : ""}`}
              dangerouslySetInnerHTML={{ __html: content.encoded }}
            />
          </div>
          <div className="col-xs-12 pad-10-lr pad-5-b">
            <hr className="margin-30-lr margin-5-b" />
            <div
              className="row flex text-align-center"
              style={{ justifyContent: "center" }}
            >
              <FacebookShareButton url={location.href}>
                <FacebookIcon round={true} style={{ height: 40 }} />
              </FacebookShareButton>

              <LinkedinShareButton url={location.href}>
                <LinkedinIcon round={true} style={{ height: 40 }} />
              </LinkedinShareButton>

              <TwitterShareButton url={location.href}>
                <TwitterIcon round={true} style={{ height: 40 }} />
              </TwitterShareButton>
            </div>
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

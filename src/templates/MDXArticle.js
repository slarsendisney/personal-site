import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import { format } from "date-fns"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleShareOptions from "../components/Articles/ArticleShareOptions"
import ReadingProgress from "../components/Articles/ReadingProgress"
import Like from "../components/Articles/StickyLike"

export default ({ data, location }) => {
  const { mdx } = data
  const { title, date, desc, coverimg, declutter } = mdx.frontmatter

  const target = React.createRef()
  return (
    <Layout>
      <SEO
        title={title}
        description={desc}
        image={"https://sld.codes" + coverimg.childImageSharp.fluid.src}
      />{" "}
      <ReadingProgress target={target} />
      <div className="is-grey is-light-grey-bg">
        <div className="row container pad-10-t " ref={target}>
          <div className="col-xs-12 pad-3-lr">
            <Link to="/articles" className="">
              <h2 className="is-grey margin-0 margin-2-b link-bar pad-1-b">{`< Articles`}</h2>
            </Link>
          </div>

          <div className="col-xs-12 pad-3-lr">
            {!declutter && (
              <>
                <Img
                  fluid={coverimg.childImageSharp.fluid}
                  style={{ maxHeight: 250 }}
                />
                <h1 className="is-hero-menu is-black margin-1-t margin-5-b">
                  {title}
                </h1>
                <h6 className="is-hero-sub-text margin-3-b">
                  {format(new Date(date), "iii, dd MMM yyyy")}
                </h6>
                <div className="line margin-5-tb" />
              </>
            )}

            <div className={`pad-10-b lato`}>
              <MDXProvider>
                <MDXRenderer>{mdx.body}</MDXRenderer>
              </MDXProvider>
            </div>
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
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      frontmatter {
        title
        year
        desc
        date
        declutter
        coverimg {
          childImageSharp {
            fluid(maxWidth: 1000) {
              # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`

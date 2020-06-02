import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

export default ({ data, location }) => {
  const { mdx } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = mdx
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        description={frontmatter.desc}
        location={location}
        image={
          "https://sld.codes" + frontmatter.coverimg.childImageSharp.fluid.src
        }
      />
      <div className="is-grey is-light-grey-bg">
        <div className="row container pad-10-t pad-10-b ">
          <div className="col-xs-12 pad-3-lr">
            <Link to="/projects" className="link">
              <h1 className="is-grey margin-0 margin-2-b grow">{`< Projects`}</h1>
            </Link>
          </div>
          <div className="col-xs-12 pad-3-lr margin-1-t">
            <Img
              fluid={frontmatter.coverimg.childImageSharp.fluid}
              style={{ maxHeight: 450 }}
            />
            <h1 className="is-hero-menu is-grey margin-5-t margin-1-b text-align-center">
              {frontmatter.title}
            </h1>
            <p className="is-hero-sub-text margin-3-b is-grey text-align-center">
              {frontmatter.desc}
            </p>
            <div className="line margin-5-b" style={{ margin: "auto" }}></div>

            <div className={`lato article`}>
              <MDXRenderer>{mdx.body}</MDXRenderer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      frontmatter {
        title
        desc
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

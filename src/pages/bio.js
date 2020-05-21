import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Timeline from "../components/Bio/Timeline"
import HeyHero from "../components/Bio/HeyHero"
export default function Bio({ data, location }) {
  return (
    <Layout>
      <SEO title={"Bio"} location={location} />
      <HeyHero data={data} />
      <div className="pad-10-t pad-5-lr pad-5-b is-light-grey-bg">
        <div className="row container ">
          <div className="col-xs-12 ">
            <h1 className="is-hero-sub-menu is-grey margin-0">
              The Short Version
            </h1>
            <Timeline />
          </div>
        </div>
      </div>

      <div className="row container ">
        <div className="col-xs-12 pad-2-lr pad-10-b">
          <h1 className="is-hero-sub-menu is-grey margin-0">
            The Long Version
          </h1>
          <div
            className="margin-5-t pad-5 is-white-bg is-grey border-radius"
            dangerouslySetInnerHTML={{
              __html: data.allMarkdownRemark.edges[0].node.html,
            }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    file(relativePath: { eq: "face.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "BIO" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
    ) {
      edges {
        node {
          html
        }
      }
    }
  }
`

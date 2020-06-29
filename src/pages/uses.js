import React from "react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
export default function Bio({ data, location }) {
  return (
    <Layout>
      <SEO
        title={"Uses"}
        location={location}
        image="https://ik.imagekit.io/sld/hero_STs91PFw6QY.png"
      />
      <div className=" is-light-grey-bg">
        <div className="pad-10-tb pad-3-lr">
          <div className="row container ">
            <div className="col-xs-12 article lato">
              <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export const query = graphql`
  {
    allMdx(filter: { frontmatter: { type: { eq: "USES" } } }, limit: 1) {
      edges {
        node {
          body
        }
      }
    }
  }
`

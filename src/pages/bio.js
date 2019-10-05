import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Timeline from "../components/Timeline"
export default function Bio({ data }) {
  console.log({ data })
  return (
    <Layout>
      <SEO title={"Bio"} />
      <div className="is-grey is-light-grey-bg pad-10-b">
        <div className="row container pad-10 pad-20-b">
          <div className="col-xs-12 col-md-7 ">
            <h1 className="is-hero-menu margin-0-t">Hey</h1>
            <div className="line margin-3-t margin-10-b" />
          </div>
        </div>
      </div>
      <div className="pad-10-t pad-10-b is-pink-bg">
        <div className="row container ">
          <div className="col-xs-12 text-align-center pad-10-l pad-10-r">
            <Img
              fluid={data.file.childImageSharp.fluid}
              style={{
                marginTop: -250,
                maxWidth: 400,
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            <h1 className="is-hero-menu is-white margin-0">
              I'm Sam Larsen-Disney
            </h1>
            <h3 className="is-white margin-0 pad-0">
              Designer. Engineer. Creator.
            </h3>
          </div>
        </div>
      </div>
      <div className="pad-10-t pad-10-l pad-10-r pad-5-b is-light-grey-bg">
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
        <div className="col-xs-12 pad-10">
          <h1 className="is-hero-sub-menu is-grey margin-0">
            The Long Version
          </h1>
          <div
            className="is-grey lato"
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

// {

//   allFile(filter: { relativePath: { eq: "CV.pdf" } }) {
//     edges {
//       node {
//         publicURL
//       }
//     }
//   }
// }

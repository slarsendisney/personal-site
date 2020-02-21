import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const Project = ({ title, desc, path, coverimg, skills }) => (
  <div className="pad-5-b">
    <Link to={path} className="link " id="path">
      <div className="grow row">
        <div className="col-xs-12 col-md-6 pad-2-t ">
          <Img
            fluid={coverimg.childImageSharp.fluid}
            className="shadow"
            style={{ maxHeight: 250 }}
          />
        </div>
        <div className="col-xs-12 col-md-6 pad-2-t">
          <h1 className="margin-3-b margin-0-t">{title}</h1>
          <h3 className="margin-0-t">{desc}</h3>
          <div className="line margin-5-t margin-5-b" />
          <p className="margin-0-t">{skills.join(", ")}</p>
        </div>
      </div>
    </Link>
  </div>
)
export default ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  let { edges } = data.allMarkdownRemark // data.markdownRemark holds our post data

  return (
    <Layout>
      <SEO title={"Projects"} />
      <div className="is-grey is-light-grey-bg pad-10">
        <div className="row container ">
          <div className="col-xs-12 ">
            <h1 className="is-hero-menu margin-0-t">Projects</h1>
            <div className="line margin-3-t margin-10-b" />
          </div>

          <div className="col-xs-12 col-md-10">
            {edges.map(item => (
              <Project {...item.node.frontmatter} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Projects {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "Project" } } }) {
      edges {
        node {
          id
          frontmatter {
            type
            title
            desc
            skills
            date
            path
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
    }
  }
`

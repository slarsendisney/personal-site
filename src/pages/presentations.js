import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Start = ({ data }) => {
  const { nodes } = data.allMdx
  return (
    <Layout>
      <SEO title="Presentations" />

      <div className="is-light-grey-bg">
        <div className="row container pad-5-t pad-5-b pad-3-lr">
          <div className="col-xs-12 ">
            <h1 className="is-grey is-hero-menu  margin-1-b">Presentations</h1>
            <div className="line-sm  is-grey" style={{ width: 305 }} />
            <div className="margin-5-b"></div>
          </div>
          {nodes.map((item) => {
            const { title, path, desc, hero, location } = item.frontmatter
            return (
              <div className="col-xs-12 col-sm-6 col-md-4  margin-5-b">
                <div
                  className="is-white-bg grow"
                  style={{
                    borderRadius: 15,
                    height: "100%",
                    maxWidth: 320,
                    margin: "auto",
                  }}
                >
                  <Link to={path + "/slides/0"} className="link ">
                    <Img
                      fluid={hero.childImageSharp.fluid}
                      style={{
                        maxHeight: 250,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                      }}
                      className="pres-image is-light-grey-border"
                    />
                    <div className="line-sm opacity-10" />
                    <div className="pad-3-lr pad-3-b is-grey">
                      <h1 className="margin-0-b">{title}</h1>
                      <h4 className="margin-0-b margin-1-t">{desc}</h4>
                      <p className="opacity-50">{location}</p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMdx {
      nodes {
        frontmatter {
          path
          title
          desc
          location
          hero {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
      }
    }
  }
`

export default Start

import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { connect } from "react-redux"
import SmoothCollapse from "react-smooth-collapse"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Start = ({ data, presentation }) => {
  const { nodes } = data.allMdx
  console.log(presentation)
  return (
    <Layout>
      <SEO title="Presentations" />

      <div className="is-light-grey-bg">
        <div className="row container pad-5-t pad-5-b pad-3-lr">
          <div className="col-xs-12 ">
            <h1 className="is-grey is-hero-menu  margin-1-b">Presentations</h1>
            <div
              className="line-sm  is-grey margin-5-b"
              style={{ width: 305 }}
            />
            <SmoothCollapse expanded={presentation && presentation.deck}>
              <Link
                to={
                  presentation
                    ? presentation.deck + "/slides/" + presentation.slide
                    : "/"
                }
                style={{ textDecoration: "none" }}
              >
                <div className="flex is-pink-bg-always is-white-always margin-5-b margin-3-lr pad-3 border-radius">
                  <h4 className="margin-0">
                    Sam is currently presenting "
                    {presentation &&
                      nodes.find(
                        (item) =>
                          presentation &&
                          presentation.deck === item.frontmatter.path
                      ).frontmatter.title}
                    ". Click to follow along!
                  </h4>
                </div>
              </Link>
            </SmoothCollapse>
          </div>

          {[
            ...nodes.filter(
              (item) =>
                presentation && presentation.deck === item.frontmatter.path
            ),
            ...nodes.filter(
              (item) =>
                !presentation ||
                (presentation && presentation.deck !== item.frontmatter.path)
            ),
          ].map((item) => {
            const { title, path, desc, hero, location } = item.frontmatter
            return (
              <div
                className="col-xs-12 col-sm-6 col-md-4 margin-5-b"
                key={title}
              >
                <div
                  className={`is-white-bg grow ${
                    presentation && presentation.deck === path ? "pulse" : ""
                  }`}
                  style={{
                    borderRadius: 15,
                    height: "100%",
                    maxWidth: 320,
                    margin: "auto",
                  }}
                >
                  <Link
                    to={
                      presentation && presentation.deck === path
                        ? path + "/slides/" + presentation.slide
                        : path + "/slides/0"
                    }
                    className="link "
                  >
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
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { type: { ne: "Article" } } }
    ) {
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

const mapStateToProps = ({ presentation }) => {
  return { presentation }
}

const ConnectedStart =
  typeof window !== `undefined` ? connect(mapStateToProps, null)(Start) : Start

export default ConnectedStart

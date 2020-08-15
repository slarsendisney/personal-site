import React from "react"
import { graphql, Link } from "gatsby"
import useDarkMode from "use-dark-mode"
import Img from "gatsby-image/withIEPolyfill"
import { connect } from "react-redux"
import { ProjectPreview } from "../templates/Projects"
import { ArticlePreview } from "../templates/Articles"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RecentEvents from "../components/Root/RecentEvents"
import ExperimentalHero from "../components/Hero/ExperimentalHero"
import EmploymentHistory from "../data/timeline.json"
import PreferPaper from "../components/Root/PreferPaper"
import getAllArticles from "../utils/getAllArticles"

const Start = ({ data, donationActive, donation }) => {
  const allArticles = getAllArticles(data)
  const featuredArticleOne = allArticles[0]
  const featuredArticleTwo = allArticles[1]
  const featuredProjectOne = data.Projects.edges[0].node.frontmatter
  const featuredProjectTwo = data.Projects.edges[1].node.frontmatter
  const currentJob = EmploymentHistory[0]
  const darkMode = useDarkMode()

  return (
    <Layout>
      <SEO title="Home" />
      <div className="is-grey is-hero-blue-bg">
        <div className="row container-small pad-3-tb">
          <div className="col-xs-12">
            <ExperimentalHero
              currentJob={currentJob}
              donationActive={donationActive}
              donation={donation}
            />
          </div>
        </div>
      </div>
      <div className="is-grey is-white-bg" id="articles">
        <div className="row container-small pad-10-t pad-3-lr pad-10-b">
          <div className="col-xs-12">
            <h2 className="margin-0">Recent Articles</h2>
          </div>
          <div className="col-xs-12 col-md-6 pad-0">
            <ArticlePreview
              {...featuredArticleOne}
              {...featuredArticleOne.fields}
            />
          </div>
          <div className="col-xs-12 col-md-6 pad-0">
            <ArticlePreview
              {...featuredArticleTwo}
              {...featuredArticleTwo.fields}
            />
          </div>
          <div
            className="col-xs-12 pad-0 pad-1-r"
            style={{ textAlign: "right" }}
          >
            <Link to="/articles" className="link-bar">
              <h3 className="font-weight-normal margin-1-b">
                ALL ARTICLES <i class="las la-arrow-right"></i>
              </h3>
            </Link>
          </div>
        </div>
      </div>
      <div className="is-grey is-light-grey-bg">
        <div className="row container-small pad-10-t  pad-3-lr pad-5-b">
          <div className="col-xs-12">
            <h2 className="margin-0 margin-2-b">Latest Projects</h2>
          </div>

          <div className="col-xs-12 col-md-6 pad-0">
            <ProjectPreview {...featuredProjectOne} />
          </div>
          <div className="col-xs-12 col-md-6 pad-0">
            <ProjectPreview {...featuredProjectTwo} />
          </div>
          <div
            className="col-xs-12 pad-0 pad-1-r"
            style={{ textAlign: "right" }}
          >
            <Link to="/projects" className="link-bar">
              <h3 className="font-weight-normal margin-1-b ">
                ALL PROJECTS <i class="las la-arrow-right"></i>
              </h3>
            </Link>
          </div>
        </div>
      </div>
      <div className="is-grey is-white-bg">
        <div className="row" style={{ position: "relative", minHeight: 350 }}>
          <Img
            fluid={data.eventHero.childImageSharp.fluid}
            style={{
              width: "100%",
              height: "100%",
              zIndex: 1,
              position: "absolute",
            }}
            objectPosition="75% 50%"
          />
          <div
            className="col-xs-12 flex align-horizontal align-vertical"
            style={{ zIndex: 1, width: "100%", backgroundColor: "#00000080" }}
          >
            <h1>Conferences and Hackathons</h1>
            <Link to="events">
              <button
                className="bubble-button border-radius"
                style={{
                  minWidth: 300,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                UPCOMING EVENTS
              </button>
            </Link>
          </div>
        </div>
      </div>
      <PreferPaper darkMode={darkMode} />
    </Layout>
  )
}

export const query = graphql`
  {
    eventHero: file(relativePath: { eq: "eventHero.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    allMdx(
      filter: { frontmatter: { type: { eq: "Article" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 2
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            desc
            featured
            tags
            coverimg {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    Projects: allMdx(
      filter: { frontmatter: { type: { eq: "Project" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 2
    ) {
      edges {
        node {
          frontmatter {
            type
            title
            desc
            date
            tags
            path
            coverimg {
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
  }
`
const mapStateToProps = ({ donationActive, donation }) => {
  return { donationActive, donation }
}

const ConnectedStart =
  typeof window !== `undefined` ? connect(mapStateToProps, null)(Start) : Start

export default ConnectedStart

import React from "react"
import { graphql, Link } from "gatsby"
import { Project } from "../templates/Projects"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RecentEvents from "../components/RecentEvents"
import sections from "../data/nav-sections.json"
import mediaLinks from "../data/media-links.json"
import NavLink from "../components/RootComponents/NavLink"
import MediaLink from "../components/RootComponents/MediaLink"
import EmploymentHistory from "../data/timeline.json"

export default function Start({ data }) {
  const featuredProject = data.Projects.edges[0].node.frontmatter
  const currentJob = EmploymentHistory[0]
  return (
    <Layout>
      <SEO title="Home" />
      <div className="is-grey is-light-grey-bg">
        <div className="row container-small pad-20-t">
          <div className="col-xs-12 col-md-6 pad-10-l">
            <h1 className="is-hero-menu margin-0">Sam</h1>
            <h1 className="is-hero-menu margin-0">Larsen-Disney</h1>
            <div className="line margin-10-t margin-10-b" />
            <div className="border" />
            <h4 className="is-hero-sub-text">
              {`${currentJob.role} @ `}
              <button
                style={{ color: "#046ED0", cursor: "pointer" }}
                onClick={() => {
                  window.open(currentJob.url, "_blank")
                }}
              >
                {currentJob.company}.
              </button>
            </h4>
            <div className="row  pad-6-t pad-10-b  pad-10-b">
              {mediaLinks.map(item => (
                <MediaLink type={item.type} url={item.url} key={item.type} />
              ))}
            </div>
          </div>
          <div className="col-xs-12 col-md-6 pad-5-l pad-10-b">
            {sections.map(item => (
              <div className="col-xs-12 " key={item.label}>
                <div className="col-xs-10 col-md-12">
                  <NavLink {...item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="is-grey is-white-bg">
        <div className="row container-small pad-10-t pad-20-b">
          <div className="col-xs-12 pad-10-lr">
            <h2 className="">Latest Project</h2>
            <Project {...featuredProject} />
          </div>
        </div>
      </div>
      <div className="is-grey is-light-grey-bg">
        <div className="row container-small pad-10-t pad-20-b">
          <div className="pad-10-lr">
            <h2 className="margin-0-b">Recent Events</h2>
          </div>
          <RecentEvents />
        </div>
      </div>
      <div className="is-grey is-pink-bg">
        <div className="row container-small pad-20-tb">
          <div className="col-xs-12 text-align-center">
            <h1 className="is-white-always">For The People Who Prefer Paper</h1>
            <Link to="/cv">
              <button
                className="btn "
                style={{
                  minWidth: 300,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                View CV
              </button>
            </Link>
            <p className="is-white-always">(Please print responsibly)</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    Articles: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "Article" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 2
    ) {
      edges {
        node {
          frontmatter {
            type
            title
            desc
            path
          }
          timeToRead
        }
      }
    }
    Projects: allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "Project" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            type
            title
            desc
            date
            skills
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

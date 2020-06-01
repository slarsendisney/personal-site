import React from "react"
import { graphql } from "gatsby"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import useDarkMode from "use-dark-mode"
import { ProjectPreview } from "../templates/Projects"
import { ArticlePreview } from "../templates/Articles"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RecentEvents from "../components/Root/RecentEvents"
import sections from "../data/nav-sections.json"
import mediaLinks from "../data/media-links.json"
import NavLink from "../components/Root/NavLink"
import MediaLink from "../components/Root/MediaLink"
import EmploymentHistory from "../data/timeline.json"
import PreferPaper from "../components/Root/PreferPaper"
import getAllArticles from "../utils/getAllArticles"

export default function Start({ data }) {
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
      <div className="is-grey is-light-grey-bg">
        <div className="row container-small pad-20-t pad-10-b">
          <div className="col-xs-12 col-sm-6 pad-5-lr">
            <h1 className="is-hero-menu margin-0">Sam</h1>
            <h1 className="is-hero-menu margin-0">Larsen-Disney</h1>
            <div className="line margin-5-tb" />
            <div className="border" />
            <h4 className="is-hero-sub-text">
              {`${currentJob.role} @ `}
              <button
                className="is-special-blue"
                onClick={() => {
                  window.open(currentJob.url, "_blank")
                }}
              >
                {currentJob.company}.
              </button>
            </h4>
            <div className="row  pad-6-t pad-10-b  pad-10-b">
              {mediaLinks.map((item) => (
                <MediaLink type={item.type} url={item.url} key={item.type} />
              ))}
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 pad-5-lr pad-10-b">
            {sections
              .filter((item) => item.home)
              .map((item) => (
                <NavLink {...item} key={item.label} />
              ))}
          </div>
        </div>
      </div>
      <div className="is-grey is-white-bg">
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
        </div>
      </div>
      <div className="is-grey is-light-grey-bg">
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
        </div>
      </div>
      <div className="is-grey is-white-bg">
        <div className="row container-small pad-5-t pad-10-b ">
          <h2 className="margin-0-b pad-3-lr">Recent Events</h2>
          <RecentEvents />
        </div>
      </div>
      <PreferPaper darkMode={darkMode} />
    </Layout>
  )
}

export const query = graphql`
  {
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
    Projects: allMarkdownRemark(
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

import React from "react"
import { graphql } from "gatsby"
import useDarkMode from "use-dark-mode"
import { ProjectPreview } from "../templates/Projects"
import { ArticlePreview } from "../templates/Articles"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RecentEvents from "../components/Root/RecentEvents"
import ExperimentalHero from "../components/Hero/ExperimentalHero"
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
        <div className="row container-small pad-10-tb">
          <div className="col-xs-12">
            <ExperimentalHero />
          </div>
        </div>
      </div>
      <div className="is-grey is-white-bg">
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

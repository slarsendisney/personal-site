import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Project, createTagGroup } from "./Projects"
import parse from "date-fns/parse"
import compareAsc from "date-fns/compareAsc"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { totalCount } = data.allMdx
  let { edges } = data.allMdx
  return (
    <Layout>
      <SEO title={`"${tag}"`} description={`Projects tagged with "${tag}"`} />
      <div className="is-grey pad-5-t container-small row ">
        <div className="col-xs-12 pad-3-lr">
          <Link to="/projects">
            <div className="flex is-grey margin-1-l">
              <h3
                className="is-grey margin-1-l margin-0-b grow"
                style={{ lineHeight: 1.5 }}
              >
                <i class="las la-arrow-left"></i>
              </h3>

              <h3
                className=" is-grey margin-1-l margin-0-b"
                style={{ lineHeight: 1.5 }}
              >
                {totalCount} PROJECT{totalCount === 1 ? "" : "S"} TAGGED WITH{" "}
                {` `}
                <span className="is-yellow-bg is-grey-always pad-1 border-radius-sm">
                  {tag.toUpperCase()}
                </span>
              </h3>
            </div>
          </Link>
        </div>
        <div className="col-xs-12 pad-0">
          <div className="row">
            {edges
              .sort((a, b) => {
                var resultA = parse(
                  a.node.frontmatter.date,
                  "yyyy-MM-dd",
                  new Date()
                )
                var resultB = parse(
                  b.node.frontmatter.date,
                  "yyyy-MM-dd",
                  new Date()
                )
                return compareAsc(resultB, resultA)
              })
              .map((item) => (
                <Project
                  {...item.node.frontmatter}
                  key={item.node.frontmatter.title}
                />
              ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allPageViews(
      filter: { path: { regex: "//articles/[^?/]*$/g" } }
      sort: { fields: totalCount, order: DESC }
      limit: 8
    ) {
      edges {
        node {
          totalCount
          path
        }
      }
    }
    tags: allMdx(filter: { frontmatter: { type: { eq: "Project" } } }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, type: { eq: "Project" } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date
            desc
            path
            featured
            tags
            coverimg {
              childImageSharp {
                fluid(maxWidth: 400) {
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

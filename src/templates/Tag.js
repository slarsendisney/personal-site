import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Article, createTagGroup, pathToTitle } from "./Articles"
import getAllArticles from "../utils/getAllArticles"
import StickyArticleSideBar from "../components/Articles/StickyArticleSideBar"
import Subscribe from "../components/Articles/Subscribe"
import { MaxStickyBarWidth } from "../utils/customHooks"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { totalCount } = data.allMdx
  const maxWidth = MaxStickyBarWidth()
  const allArticles = getAllArticles(data)
  const popular = data.allPageViews
  const tags = data.tags.group
    .sort((a, b) => b.totalCount - a.totalCount)
    .slice(0, 10)
    .map((item) => item.tag)
  return (
    <Layout>
      <SEO
        title={`"${tag}"`}
        description="✍️ I Write Occasionally. I hope you find something useful!"
      />
      <div className="is-grey  pad-5-t container-small row ">
        <div className="col-xs-12 col-md-9 pad-3-lr ">
          <div className="flex is-grey">
            <Link to="/articles">
              <h3
                className="is-grey margin-1-l margin-0-b grow"
                style={{ lineHeight: 1.5 }}
              >
                <i class="las la-arrow-left"></i>
              </h3>
            </Link>
            <h3 className="margin-1-l margin-0-b" style={{ lineHeight: 1.5 }}>
              {totalCount} ARTICLE{totalCount === 1 ? "" : "S"} TAGGED WITH{" "}
              {` `}
              <span className="is-yellow-bg is-grey-always pad-1 border-radius-sm">
                {tag.toUpperCase()}
              </span>
            </h3>
          </div>
          {allArticles.map((node) => {
            return (
              <div className="grow">
                <Article {...node} {...node.fields} key={node.fields.slug} />
              </div>
            )
          })}
        </div>
        <div
          className="col-xs-12 col-md-3  pad-3-l"
          style={{ position: "relative" }}
        >
          <StickyArticleSideBar>
            <div
              className="row pad-3-r"
              style={{ maxWidth: maxWidth, width: "100%" }}
            >
              <div className="col-xs-12 col-sm-6 col-md-12">
                <h3 className="margin-0-b">POPULAR CONTENT</h3>
                {popular.edges.map((item) => (
                  <div>
                    <Link to={item.node.path} className="is-special-blue">
                      <p className="">{pathToTitle(item.node.path)}</p>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="col-xs-12 col-sm-6 col-md-12">
                <h3 className="margin-0-b">TOP TAGS</h3>
                <div className="flex flex-wrap margin-3-tb">
                  {createTagGroup(tags)}
                </div>
              </div>
            </div>
          </StickyArticleSideBar>
        </div>

        <div className="col-md-9 pad-0 margin-10-b ">
          <div className="line-sm margin-1-t margin-3-b margin-5-lr opacity-10" />

          <Subscribe />
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
    tags: allMdx {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
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

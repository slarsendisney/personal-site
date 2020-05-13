import React from "react"
import { StaticQuery, graphql } from "gatsby"

const Trend = ({ data }) => {
  //   console.log(data)
  const allViewsPerDate = data.allViewsPerDate.edges
  const maxViews = data.maxViews.edges[0].node.views

  return (
    <div
      className="col-xs-12 margin-10-t flex"
      style={{ height: 100, justifyContent: "center" }}
    >
      {allViewsPerDate.map((item) => {
        return (
          <div
            className="is-white-bg border-radius margin-1-r"
            style={{
              position: "relative",
              width: 100 / 30 + "%",
              maxWidth: 20,
            }}
          >
            <div
              className="is-pink-bg border-radius margin-1-r"
              style={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: Math.floor((item.node.views / maxViews) * 100),
              }}
            />
          </div>
        )
      })}
    </div>
  )
}

export default () => {
  return (
    <StaticQuery
      query={graphql`
        {
          maxViews: allViewsPerDate(
            sort: { fields: views, order: DESC }
            limit: 1
          ) {
            edges {
              node {
                views
              }
            }
          }
          allViewsPerDate(sort: { fields: date, order: ASC }) {
            edges {
              node {
                views
                date
              }
            }
          }
          allFeedMediumBlog {
            nodes {
              title
              isoDate
            }
          }
          allMdx(filter: { frontmatter: { type: { ne: "Article" } } }) {
            nodes {
              frontmatter {
                date
                title
              }
            }
          }
        }
      `}
      render={(data) => <Trend data={data} />}
    />
  )
}

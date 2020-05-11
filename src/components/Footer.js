import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"

export default ({ location }) => {
  return (
    <footer className="is-white-bg is-grey pad-2 footer">
      Made with{" "}
      <span role="img" aria-label="love">
        ❤️
      </span>{" "}
      by Sam Larsen-Disney
      <br />
      <StaticQuery
        query={graphql`
          {
            allPageViews {
              edges {
                node {
                  totalCount
                  path
                  sessions
                }
              }
            }
            siteWideStats {
              sessions
              pageViews
            }
          }
        `}
        render={(data) => {
          const pageViews = data.allPageViews.edges.find(
            (item) => item.node.path === location.pathname
          )
          if (pageViews) {
            let node = pageViews.node

            return (
              <p className="legal margin-0 margin-1-t">
                Page Stats | {node.totalCount} views | {node.sessions} sessions
                |{" "}
                <Link to="/stats" className="is-special-blue">
                  All Stats
                </Link>{" "}
                -{" "}
                <Link to="/disclaimer" className="is-special-blue">
                  Disclaimer
                </Link>
              </p>
            )
          } else {
            return (
              <p className="legal margin-0 margin-1-t">
                Site Stats | {data.siteWideStats.pageViews} views |{" "}
                {data.siteWideStats.sessions} sessions |{" "}
                <Link to="/stats" className="is-special-blue">
                  All Stats
                </Link>{" "}
                -{" "}
                <Link to="/disclaimer" className="is-special-blue">
                  Disclaimer
                </Link>
              </p>
            )
          }
        }}
      />
    </footer>
  )
}

import React from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import { Emojione } from "react-emoji-render"
export default ({ location }) => {
  return (
    <footer
      className="is-white-bg is-grey pad-2-lr pad-3-t pad-2-b footer"
      id="footer"
    >
      <p className="margin-0">
        Made with <Emojione text="❤️" /> by Sam Larsen-Disney
      </p>

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
              <p className="footer-sub-text margin-0 margin-1-t margin-2-b">
                {node.totalCount} page views | {node.sessions} sessions |{" "}
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
              <p className="footer-sub-text margin-0 margin-1-t margin-2-b">
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

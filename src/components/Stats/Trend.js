import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { format } from "date-fns"
import { useWindowSize } from "../../utils/customHooks"
import getAllArticles from "../../utils/getAllArticles"

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
]

const Trend = ({ data }) => {
  const size = useWindowSize()
  const allViewsPerDate =
    size.width > 900
      ? data.allViewsPerDate.edges
      : data.allViewsPerDate.edges.slice(data.allViewsPerDate.edges.length - 14)
  const maxViews = data.maxViews.edges[0].node.views
  const α = 0.7
  const B = 1000
  const normalisedViews = allViewsPerDate.map((item) => ({
    node: {
      ...item.node,
      standard: (1 - α) * item.node.views + α * B,
    },
  }))
  const normalisedMax = (1 - α) * maxViews + α * B

  const projects = data.projects.edges.reduce((acc, cur) => {
    const date = new Date(cur.node.frontmatter.date)
    acc[format(date, "yyyyMMdd")] = cur.node.frontmatter.title
    return acc
  }, {})
  const articles = getAllArticles(data).reduce((acc, cur) => {
    const date = new Date(cur.pubDate)
    acc[format(date, "yyyyMMdd")] = cur.title
    return acc
  }, {})

  const completeArticles = articles

  const decks = data.decks.nodes.reduce((acc, cur) => {
    const date = new Date(cur.frontmatter.date)

    acc[format(date, "yyyyMMdd")] = cur.frontmatter.title
    return acc
  }, {})
  return (
    <>
      <div className="col-xs-12 is-grey">
        <h4 className="margin-0 margin-3-b">
          VIEWS OVER LAST {allViewsPerDate.length > 14 ? "MONTH" : "FORTNIGHT"}
        </h4>
      </div>
      <div className="col-xs-12 is-grey flex align-horizontal">
        <div
          className="is-special-blue-bg margin-1-r"
          style={{
            height: 15,
            width: 15,
            borderRadius: 7.5,
          }}
        />
        <p className="margin-0 margin-1-r">Article Added</p>
        <div
          className="is-green-bg margin-1-r"
          style={{
            height: 15,
            width: 15,
            borderRadius: 7.5,
          }}
        />
        <p className="margin-0 margin-1-r">Deck Added</p>
        <div
          className="is-orange-bg margin-1-r"
          style={{
            height: 15,
            width: 15,
            borderRadius: 7.5,
          }}
        />
        <p className="margin-0 ">Project Added</p>
      </div>

      <div
        className="col-xs-12 margin-1-t flex "
        style={{ height: 10, justifyContent: "center" }}
      >
        {allViewsPerDate.map((item, index) => {
          return (
            <div
              className="margin-1-r  text-align-center"
              style={{
                position: "relative",
                width: 100 / allViewsPerDate.length + "%",
              }}
            >
              {(item.node.date.slice(-2) === "01" || index === 0) && (
                <p className="legal is-grey">
                  <strong>
                    {
                      monthNames[
                        parseInt(item.node.date.slice(-4).slice(0, 2)) - 1
                      ]
                    }
                  </strong>
                </p>
              )}
            </div>
          )
        })}
      </div>
      <div
        className="col-xs-12 margin-3-t flex"
        style={{ height: 10, justifyContent: "center" }}
      >
        {allViewsPerDate.map((item) => {
          return (
            <div
              className="margin-1-r text-align-center"
              style={{
                position: "relative",
                width: 100 / allViewsPerDate.length + "%",
              }}
            >
              <p className="legal is-grey opacity-80">
                {item.node.date.slice(-2)}
              </p>
            </div>
          )
        })}
      </div>
      <div
        className="col-xs-12 margin-3-t flex"
        style={{ height: 100, justifyContent: "center" }}
      >
        {normalisedViews.map((item) => {
          return (
            <div
              className="is-light-grey-bg border-radius margin-1-r"
              style={{
                position: "relative",
                width: 100 / allViewsPerDate.length + "%",
              }}
              data-tip={`${item.node.views} views`}
            >
              <div
                className="is-pink-bg-always border-radius margin-1-r"
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: Math.floor(
                    (item.node.standard / normalisedMax) * 100
                  ),
                }}
              />
            </div>
          )
        })}
      </div>
      <div
        className="col-xs-12 margin-1-t flex"
        style={{ justifyContent: "center" }}
      >
        {allViewsPerDate.map((item) => {
          return (
            <div
              className="flex  margin-1-r"
              style={{
                width: 100 / allViewsPerDate.length + "%",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {completeArticles[item.node.date] && (
                <div
                  className="is-special-blue-bg margin-1-b"
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 7.5,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  data-tip={`"${
                    completeArticles[item.node.date]
                  }" Article Added`}
                />
              )}
              {decks[item.node.date] && (
                <div
                  className="is-green-bg margin-1-b"
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 7.5,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  data-tip={`"${decks[item.node.date]}" Deck Added`}
                />
              )}
              {projects[item.node.date] && (
                <div
                  className="is-orange-bg margin-1-b"
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 7.5,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  data-tip={`"${projects[item.node.date]}" Project Added`}
                />
              )}
            </div>
          )
        })}
      </div>
    </>
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

          projects: allMdx(
            filter: { frontmatter: { type: { eq: "Project" } } }
          ) {
            edges {
              node {
                frontmatter {
                  date
                  title
                }
              }
            }
          }
          allMdx(filter: { frontmatter: { type: { eq: "Article" } } }) {
            edges {
              node {
                frontmatter {
                  title
                  date
                }
              }
            }
          }
          decks: allMdx(filter: { frontmatter: { type: { ne: "Article" } } }) {
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

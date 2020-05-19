import React from "react"
import { graphql, Link } from "gatsby"
import { connect } from "react-redux"
import { Emojione } from "react-emoji-render"
import ReactTooltip from "react-tooltip"
import SEO from "../components/seo"
import Layout from "../components/layout"
import StatsCard from "../components/Stats/StatsCard"
import { useCollectionOnce } from "react-firebase-hooks/firestore"
import Trend from "../components/Stats/Trend"

let firebase

if (typeof window !== "undefined") {
  firebase = require("firebase/app")
  require("firebase/firestore")
}

const Stats = ({ data, count }) => {
  const [value, loading, error] = useCollectionOnce(
    typeof window !== "undefined"
      ? firebase.firestore().collection("likes")
      : ""
  )

  const { JavaScript, Markdown, Sass, JSON, SUM } = data.statsJson
  const totalCount = data.gitHubProfile.commitsOnRepo
  const totalViews = data.siteWideStats.pageViews
  const totalSessions = data.siteWideStats.sessions

  const cards = { JavaScript, Markdown, Sass, JSON }
  const statsByCodeCount = []
  const statsByFileCount = []
  Object.keys(cards).forEach((key) => {
    cards[key].percentage = Math.floor((cards[key].code / SUM.code) * 100)
  })
  Object.keys(cards).forEach((item) => {
    statsByCodeCount.push({
      name: item,
      value: cards[item].code,
    })
    statsByFileCount.push({
      name: item,
      value: cards[item].nFiles,
    })
  })
  const reacts =
    loading || error
      ? {
          total: "...",
          fire: "...",
          uncorn: "...",
          popcorn: "...",
          avo: "...",
        }
      : value.docs.reduce((acc, cur) => {
          const obj = cur.data()
          Object.keys(obj).map((key) => {
            if (acc.total) {
              acc.total = acc.total + (obj[key] >= 0 ? obj[key] : 0)
            } else {
              acc.total = obj[key]
            }
            if (acc[key]) {
              acc[key] = acc[key] + obj[key]
            } else {
              acc[key] = obj[key]
            }
          })
          return acc
        }, {})
  return (
    <Layout>
      <SEO
        title="Stats"
        description="Ever wondered how many lines of code are at work here?"
      />
      <ReactTooltip className="lato" />
      <div className="row container pad-10-t pad-10-b pad-3-lr">
        <div className="col-xs-12  is-grey">
          <h1 className=" margin-2-t">
            You are{" "}
            {count > 1 ? (
              <>
                among <span className="is-pink-always">{count}</span> people{" "}
              </>
            ) : (
              <>
                {" "}
                the only <span className="is-pink-always">1</span>{" "}
              </>
            )}
            currently visiting the site. The site has recieved{" "}
            <span className="is-special-blue">
              {totalViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>{" "}
            page views across{" "}
            <span className="is-special-blue">
              {totalSessions.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            </span>
            sessions.{" "}
          </h1>

          <h1 className=" margin-2-t">
            Articles I have written have been reacted to{" "}
            <span className="is-special-blue">
              {reacts.total ? reacts.total : "X"}
            </span>{" "}
            times with{" "}
            <span className="is-green">{reacts.avo ? reacts.avo : "X"}</span>{" "}
            <Emojione text={"🥑"} />,{" "}
            <span className="is-red">
              {reacts.popcorn ? reacts.popcorn : "X"}
            </span>{" "}
            <Emojione text={"🍿"} />,{" "}
            <span className="is-orange">{reacts.fire ? reacts.fire : "X"}</span>{" "}
            <Emojione text={"🔥"} /> and{" "}
            <span className="is-red">
              {reacts.unicorn ? reacts.unicorn : "X"}
            </span>{" "}
            <Emojione text={"🦄"} />.
          </h1>

          <h1 className=" margin-2-t">
            The latest build of this site has{" "}
            <span className="is-special-blue">{SUM.code}</span> lines of code,{" "}
            <span className="is-orange-always">{SUM.comment}</span> comments and{" "}
            <span className="is-green-always">{totalCount}</span> commits*.
          </h1>

          <p>
            * These stats only account for code I have written myself. Page
            views, sessions and commit count are refreshed daily at 9PM GMT.
          </p>
          <div className="line margin-8-tb" />
        </div>

        <div className="col-xs-4 col-md-6 is-grey">
          <h2 className="margin-0 margin-2-b">Popular Pages</h2>
        </div>
        <div className="col-xs-4 col-md-3 text-align-center is-grey">
          <h2 className="margin-0 margin-2-b">Views</h2>
        </div>
        <div className="col-xs-4 col-md-3 text-align-center is-grey">
          <h2 className="margin-0 margin-2-b">Sessions</h2>
        </div>
        {data.allPageViews.edges.slice(0, 5).map((item) => (
          <>
            <div className="col-xs-4 col-md-6 is-grey">
              <Link to={item.node.path} className="is-special-blue">
                <p className="margin-0">
                  sld.codes{item.node.path === "/" ? "" : item.node.path}
                </p>
              </Link>
            </div>
            <div className="col-xs-4 col-md-3 text-align-center is-grey">
              <p className="margin-0 margin-1-b">{item.node.totalCount}</p>
            </div>
            <div className="col-xs-4 col-md-3 text-align-center is-grey">
              <p className="margin-0 margin-1-b">{item.node.sessions}</p>
            </div>
          </>
        ))}
        <Trend />
        <div className="col-xs-12 is-grey margin-8-t">
          <h2 className="margin-0 margin-1-b">Project Breakdown By Language</h2>
        </div>
        {Object.keys(cards).map(function (item) {
          return <StatsCard name={item} {...cards[item]} />
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
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
      pageViews
      sessions
    }
    gitHubProfile {
      totalContributions
      commitsOnRepo
    }
    statsJson {
      JavaScript {
        nFiles
        comment
        code
        blank
      }
      Markdown {
        blank
        code
        comment
        nFiles
      }
      Sass {
        blank
        code
        comment
        nFiles
      }
      JSON {
        blank
        code
        comment
        nFiles
      }
      SUM {
        blank
        code
        comment
        nFiles
      }
    }
  }
`

const mapStateToProps = ({ count }) => {
  return { count }
}

const ConnectedStats =
  typeof window !== `undefined` ? connect(mapStateToProps, null)(Stats) : Stats

export default ConnectedStats

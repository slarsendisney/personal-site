import React from "react"
import { graphql } from "gatsby"
import { connect } from "react-redux"
import { Emojione } from "react-emoji-render"
import SEO from "../components/seo"
import Layout from "../components/layout"
import StatsCard from "../components/Stats/StatsCard"
import PieChart from "../components/Stats/PieChart"
import { useCollectionOnce } from "react-firebase-hooks/firestore"

let firebase

if (typeof window !== "undefined") {
  firebase = require("firebase/app")
  require("firebase/firestore")
}

const Stats = ({ data, count }) => {
  const [value, loading, error] = useCollectionOnce(
    firebase.firestore().collection("likes")
  )
  const { JavaScript, Markdown, Sass, JSON, SUM } = data.statsJson
  const { totalCount } = data.allGitlogJson
  const cards = { JavaScript, Markdown, Sass, JSON }
  const statsByCodeCount = []
  const statsByFileCount = []
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
          console.log(cur.id)
          Object.keys(obj).map((key) => {
            if (acc.total) {
              acc.total = acc.total + obj[key]
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
  console.log(reacts)
  return (
    <Layout>
      <SEO
        title="Stats"
        description="Ever wondered how many lines of code are at work here?"
      />
      <div className="row container pad-10-t pad-5-lr">
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
            currently visiting the site. At last count, the site had had{" "}
            <span className="is-light-blue-always">2,000</span>+ visits.{" "}
          </h1>

          <h1 className=" margin-2-t">
            Articles I have written have been reacted to{" "}
            <span className="is-special-blue">{reacts.total}</span> times with{" "}
            <span className="is-green">{reacts.avo}</span>{" "}
            <Emojione text={"🥑"} />,{" "}
            <span className="is-red">{reacts.popcorn}</span>{" "}
            <Emojione text={"🍿"} />,{" "}
            <span className="is-orange">{reacts.fire}</span>{" "}
            <Emojione text={"🔥"} /> and{" "}
            <span className="is-red">{reacts.unicorn}</span>{" "}
            <Emojione text={"🦄"} />.
          </h1>

          <h1 className=" margin-2-t">
            The latest build of this site has{" "}
            <span className="is-special-blue">{SUM.code}</span> lines of code,{" "}
            <span className="is-orange-always">{SUM.comment}</span> comments and{" "}
            <span className="is-green-always">{totalCount}</span> commits.*
          </h1>

          <p>* These stats only account for code I have written myself.</p>
          <div className="line margin-5-tb" />
        </div>

        {Object.keys(cards).map(function (item) {
          return <StatsCard name={item} {...cards[item]} />
        })}
        <div className="col-xs-12 col-md-6 is-grey margin-5-t">
          <h2>By Line Count</h2>
          <div style={{ height: 400 }}>
            <PieChart data={statsByCodeCount} />
          </div>
        </div>
        <div className="col-xs-12 col-md-6 is-grey margin-5-t">
          <h2>By File Count</h2>
          <div style={{ height: 400 }}>
            <PieChart data={statsByFileCount} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allGitlogJson {
      totalCount
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

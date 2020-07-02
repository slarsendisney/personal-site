import React, { useRef } from "react"
import { graphql, Link } from "gatsby"
import { connect } from "react-redux"
import { Emojione } from "react-emoji-render"
import GitHubButton from "react-github-btn"
import useDarkMode from "use-dark-mode"
import SEO from "../components/seo"
import Layout from "../components/layout"
import StatsCard from "../components/Stats/StatsCard"
import {
  useCollectionOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore"
import Trend from "../components/Stats/Trend"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import {
  BuyMeACoffeeButton,
  PatreonButton,
} from "../components/Articles/ArticleShareOptions"

let firebase

if (typeof window !== "undefined") {
  firebase = require("firebase/app")
  require("firebase/firestore")
}

const colours = ["green", "orange", "yellow", "pink"]

const Stats = ({ data, count }) => {
  const [value, loading, error] = useCollectionOnce(
    typeof window !== "undefined"
      ? firebase.firestore().collection("likes")
      : ""
  )

  const [coffees, loadingCoffees, errorCoffees] = useDocumentDataOnce(
    typeof window !== "undefined"
      ? firebase.firestore().doc("coffee/ko-fi")
      : ""
  )
  const darkMode = useDarkMode(false)

  const { JavaScript, Markdown, Sass, JSON, SUM } = data.statsJson
  const totalCount = data.gitHubProfile.commitsOnRepo
  const { forks, stars } = data.gitHubProfile
  const totalViews = data.siteWideStats.pageViews
  const totalSessions = data.siteWideStats.sessions
  const cards = { JavaScript, Markdown, Sass, JSON }

  const statsByCodeCount = []
  const statsByFileCount = []
  let remainingPct = 100
  Object.keys(cards).forEach((key) => {
    remainingPct = remainingPct - Math.floor((cards[key].code / SUM.code) * 100)
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
          unicorn: "...",
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
      <div>
        <div className="row container pad-10-t pad-10-b pad-3-lr">
          <div className="col-xs-12  is-grey">
            <h2 className=" margin-2-t">
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
            </h2>
            <h2 className=" margin-2-t ">
              Dark mode has been toggled{" "}
              <span className="is-special-blue bold">
                {data.darkModeToggles.totalEvents}
              </span>{" "}
              times. Easter eggs on this site have been triggered{" "}
              <span className="is-special-blue bold">
                {data.eggTriggers.totalEvents}
              </span>{" "}
              times.
            </h2>
            <h2 className=" margin-2-t">
              In total, I have written{" "}
              <span className="is-special-blue">
                {data.articleCount.totalCount}
              </span>{" "}
              articles. Articles have been reacted to{" "}
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
              <span className="is-orange">
                {reacts.fire ? reacts.fire : "X"}
              </span>{" "}
              <Emojione text={"🔥"} /> and{" "}
              <span className="is-red">
                {reacts.unicorn ? reacts.unicorn : "X"}
              </span>{" "}
              <Emojione text={"🦄"} />.
            </h2>

            <h2 className=" margin-2-t">
              The latest build of this site has{" "}
              <span className="is-special-blue">{SUM.code}</span> lines of code,{" "}
              <span className="is-orange-always">{SUM.comment}</span> comments
              and <span className="is-green-always">{totalCount}</span>{" "}
              commits*.
            </h2>
          </div>
        </div>
      </div>

      <div className="is-white-bg">
        <div className="row container pad-10-tb pad-3-lr">
          <div className="col-xs-12 margin-3-b">
            <h4 className="margin-0-b">
              SPONSORSHIP <Emojione text={"❤️"} />
            </h4>
            <h2 className=" margin-2-t">
              Some incredibly generous people have bought me{" "}
              <span className="is-special-blue">
                {loadingCoffees ? "..." : coffees.count}
              </span>{" "}
              coffees to help power my creativity. The most recent coffee was
              bought by{" "}
              <span className="is-special-blue">
                {loadingCoffees ? "..." : coffees.recent}
              </span>{" "}
              . Thanks for supporting what I do - you're awesome.
            </h2>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 margin-3-b">
            <BuyMeACoffeeButton />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 margin-3-b">
            <PatreonButton />
          </div>
        </div>
      </div>
      <div>
        <div className="row container pad-10-tb pad-3-lr">
          <div className="col-xs-12 flex margin-3-b">
            <h4 className="margin-0-b">POPULAR PAGES - LAST 30 DAYS</h4>
          </div>

          <div className="col-xs-4 col-md-6 is-grey">
            <h3 className="margin-0 margin-2-b">
              <strong>Page</strong>
            </h3>
          </div>
          <div className="col-xs-4 col-md-3 text-align-center is-grey">
            <h3 className="margin-0 margin-2-b">
              <strong>Views</strong>
            </h3>
          </div>
          <div className="col-xs-4 col-md-3 text-align-center is-grey">
            <h3 className="margin-0 margin-2-b">
              <strong>Sessions</strong>
            </h3>
          </div>

          {data.allPageViews.edges.slice(0, 5).map((item) => (
            <>
              <div className="col-xs-4 col-md-6 is-grey">
                <Link to={item.node.path} className="is-special-blue">
                  <p className="margin-0">{item.node.path}</p>
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
        </div>
      </div>
      <div className="is-white-bg">
        <div className="row container pad-10-tb pad-3-lr">
          <Trend />
        </div>
      </div>
      <div>
        <div className="row container pad-10-tb pad-3-lr">
          <div className="col-xs-12 is-grey">
            <h4 className="margin-0">PROJECT BREAKDOWN BY LANGUAGE</h4>
          </div>
          <div className="col-xs-12 margin-2-b">
            <OutboundLink href="https://jackmorrison.xyz/">
              <p className="legal block is-special-blue margin-0-tb">
                Graph below inspired by Jack Morrison
              </p>
            </OutboundLink>
          </div>
          <div className="col-xs-12">
            <div className="flex margin-1-t">
              {Object.keys(cards).map(function (item, index) {
                return (
                  <div
                    className={`is-${colours[index]}-bg-always`}
                    style={{
                      width: `${cards[item].percentage}%`,
                      height: 20,
                      borderTopLeftRadius: index === 0 ? 5 : 0,
                      borderBottomLeftRadius: index === 0 ? 5 : 0,
                    }}
                    data-tip={`${cards[item].percentage}% ${item}`}
                  />
                )
              })}
              <div
                className={`is-special-blue-bg`}
                data-tip={`${remainingPct}% Other`}
                style={{
                  width: `${remainingPct}%`,
                  height: 20,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              />
            </div>
          </div>

          {Object.keys(cards).map(function (item) {
            return <StatsCard name={item} {...cards[item]} />
          })}
        </div>
      </div>
      <div className="is-white-bg">
        <div className="row container pad-10-tb pad-3-lr">
          <div className="col-xs-12 is-grey">
            <h4 className="margin-0 margin-1-b">GITHUB REPO</h4>
            <h2 className=" margin-2-t">
              This site's repository has been starred{" "}
              <span className="is-special-blue bold">{stars}</span> times and
              forked <span className="is-special-blue bold">{forks}</span>{" "}
              times.
            </h2>
            <div className="flex" style={{ flexWrap: "wrap" }}>
              <div className="margin-1-r">
                <GitHubButton
                  href="https://github.com/slarsendisney"
                  data-color-scheme={darkMode.value ? "dark" : "light"}
                  data-size="large"
                  aria-label="Follow @slarsendisney on GitHub"
                >
                  Follow @slarsendisney
                </GitHubButton>
              </div>
              <div className="margin-1-r">
                <GitHubButton
                  href="https://github.com/slarsendisney/personal-site/fork"
                  data-color-scheme={darkMode.value ? "dark" : "light"}
                  data-icon="octicon-repo-forked"
                  data-size="large"
                  aria-label="Fork slarsendisney/personal-site on GitHub"
                >
                  Fork
                </GitHubButton>
              </div>

              <div>
                <GitHubButton
                  href="https://github.com/slarsendisney/personal-site"
                  data-color-scheme={darkMode.value ? "dark" : "light"}
                  data-icon="octicon-star"
                  data-size="large"
                  aria-label="Star nslarsendisney/personal-site on GitHub"
                >
                  Star
                </GitHubButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row container pad-10-tb pad-3-lr">
          <div className="col-xs-12 is-grey">
            <h2 className=" margin-2-t">
              Want to know more about how this page works? I have written a
              "deep dive" article that goes into detail about integrating and
              using stats with code examples.
            </h2>
            <Link to="/articles/Deep-Dive-Into-My-Stats-Page">
              <button className="bubble-button border-radius">
                Take Me There
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="is-white-bg">
        <div className="row container pad-5-t pad-3-lr">
          <div className="col-xs-12 is-grey text-align-center">
            <p className="margin-0 legal">
              * Code count only account for code I have written myself. Page
              views, sessions, events and commit count are refreshed daily at
              9PM GMT.
            </p>
          </div>
        </div>
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
    articleCount: allMdx(filter: { frontmatter: { type: { eq: "Article" } } }) {
      totalCount
    }
    siteWideStats {
      pageViews
      sessions
    }
    eggTriggers: siteEvents(eventLabel: { eq: "Egg-Nav" }) {
      totalEvents
    }
    darkModeToggles: siteEvents(eventLabel: { eq: "Dark Mode Toggle Button" }) {
      totalEvents
    }
    gitHubProfile {
      totalContributions
      commitsOnRepo
      forks
      stars
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

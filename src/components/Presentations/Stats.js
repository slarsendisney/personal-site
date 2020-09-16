import React from "react"
import { connect } from "react-redux"
import { Link } from "gatsby"
let pathname = typeof window !== "undefined" ? window.location.pathname : ""
const Stats = ({ count, polls, pollIDs }) => {
  let pollsInScope = new Set(pollIDs)
  let currentDeck = pathname.split("/")[2]
  console.log({ polls, pathname, currentDeck })
  let votes = 0
  Object.keys(polls).forEach((key) => {
    if (pollsInScope.has(key)) {
      Object.keys(polls[key]).forEach((pollsKey) => {
        votes += polls[key][pollsKey]
      })
    }
  })
  return (
    <div>
      <h6 className="lato-always is-grey margin-0-b">PRESENTATION STATS</h6>
      <p>
        You are among {count} people currently participating. Polls in this
        presentation have been interacted with {votes} times.
      </p>
      <Link to="/stats">
        <button className="bubble-button border-radius">
          <p className="margin-0 legal is-white-always">See more stats!</p>
        </button>
      </Link>
    </div>
  )
}

const mapStateToProps = ({ count, polls }) => {
  return { count, polls }
}

const ConnectedStats =
  typeof window !== `undefined` ? connect(mapStateToProps)(Stats) : Stats

export default ConnectedStats

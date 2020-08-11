import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { useLocalStorage } from "../../utils/customHooks"

// Declaring poll question and answers
const pollQuestion = "Are you working from home?"
let starterPollAnswers = [
  { option: "Yes", votes: 0 },
  { option: "No", votes: 0 },
]
let pollID =
  typeof window !== "undefined"
    ? window.location.pathname.substring(1).split("/").join("-")
    : ""

const PollView = ({
  polls,
  submitVote,
  question = pollQuestion,
  answers = starterPollAnswers,
}) => {
  const evaluatePoll = (polls) => {
    if (!polls) {
      return answers
    }
    return answers.map(({ option }) => {
      if (polls[pollID] && polls[pollID][option]) {
        return {
          option,
          votes: polls[pollID][option],
        }
      }
      return {
        option,
        votes: 0,
      }
    })
  }
  const [pollAnswers, setPollAnswers] = useState(evaluatePoll(polls))
  const [userPollVotes, setUserPollVotes] = useLocalStorage("userPollVotes", {})
  const handleVote = (voteAnswer) => {
    setUserPollVotes({ ...userPollVotes, [pollID]: voteAnswer })
    submitVote(pollID, voteAnswer)
  }
  useEffect(() => {
    setPollAnswers(evaluatePoll(polls))
  }, [polls])

  const totalVotes = pollAnswers.reduce((acc, cur) => {
    acc += cur.votes
    return acc
  }, 0)
  const submitted = userPollVotes[pollID] ? true : false
  const userChoice = userPollVotes[pollID] ? userPollVotes[pollID] : ""
  return (
    <div className="lato-always poll flex align-horizontal align-vertical">
      <h3 className="margin-3-b">{question}</h3>
      {!submitted ? (
        <div className="row fill-width">
          {answers.map(({ option }) => (
            <div className="col-xs-12 margin-2-b">
              <button
                className="bubble-button fill-width border-radius"
                onClick={() => handleVote(option)}
              >
                <p>{option}</p>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="row fill-width">
          {totalVotes > 0 ? (
            <>
              {pollAnswers.map(({ option, votes }) => (
                <div className="col-xs-12 margin-2-b">
                  <div
                    className="is-light-grey-bg  fill-width border-radius"
                    style={{ position: "relative", height: 60 }}
                  >
                    <div
                      className="is-special-blue-bg border-radius opacity-50 poll"
                      style={{
                        position: "absolute",
                        zIndex: 1000,
                        height: "100%",
                        width: `${Math.floor((votes / totalVotes) * 100)}%`,
                      }}
                    ></div>
                    <div
                      className="fill-width flex align-horizontal align-vertical"
                      style={{
                        position: "absolute",
                        zIndex: 1100,
                        height: "100%",
                      }}
                    >
                      <p className={`${userChoice === option ? "bold" : ""}`}>
                        {Math.floor((votes / totalVotes) * 100)}% {option}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>Submitting vote...</p>
          )}
        </div>
      )}
      <p className="opacity-70">{totalVotes} votes submitted</p>
    </div>
  )
}

const mapStateToProps = ({ polls }) => {
  return { polls }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitVote: (id, vote) =>
      dispatch({ type: "server/poll", data: { id, vote } }),
  }
}

const ConnectedPollView =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(PollView)
    : PollView

export default ConnectedPollView

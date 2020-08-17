import React, { useState } from "react"
import { connect } from "react-redux"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { Emojione } from "react-emoji-render"

let firebase

if (typeof window !== "undefined") {
  firebase = require("firebase/app")
  require("firebase/firestore")
}

let QandAID =
  typeof window !== "undefined"
    ? window.location.pathname.substring(1).split("/").join("-")
    : ""

const QuestionCard = ({ question }) => {
  const [answered, setAnswered] = useState(false)

  return (
    <div className="col-xs-12 col-md-4 pad-1 fill-height">
      <button
        className={`${
          answered
            ? "is-special-blue-bg is-white-always"
            : "is-light-grey-bg is-grey"
        } pad-2 border-radius fill-height fill-width`}
        onClick={() => setAnswered(!answered)}
      >
        <p
          style={{ fontSize: 20 }}
          className={`${answered && "is-white-always"}`}
        >
          {question}
        </p>
      </button>
    </div>
  )
}
const QuestionReel = () => {
  const [value, loading, error] = useDocumentData(
    firebase.firestore().doc(`QandA/${QandAID}`)
  )
  return (
    <div className="QA">
      <h4>Q&A Session</h4>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data.</p>}

      {!loading && !error && value && value.questions && (
        <div className="row">
          <div className="col-xs-12">
            <p className="opacity-50" style={{ fontSize: 20 }}>
              {value.questions.length} questions asked.
            </p>
          </div>
          {value.questions.map((question) => (
            <QuestionCard question={question} />
          ))}
        </div>
      )}
    </div>
  )
}

const QuestionForm = ({ submitQuestion }) => {
  const [submitted, setSubmitted] = useState(false)
  const [question, setQuestion] = useState("")
  const onSubmit = () => {
    if (question !== "") {
      submitQuestion(QandAID, question)
      setSubmitted(true)
      setQuestion("")
    }
  }
  return (
    <div className="QA">
      <h4>Q&A Session</h4>
      {submitted ? (
        <>
          <p className="margin-5-tb">
            <Emojione text="✅ Question Submitted!" />{" "}
          </p>
          <button
            className="bubble-button border-radius "
            onClick={() => setSubmitted(false)}
          >
            <p className="legal is-white-always margin-0">Ask Another</p>
          </button>{" "}
        </>
      ) : (
        <>
          {" "}
          <p className="legal">
            Want to ask me a question? It's anonymous <Emojione text="💫" />.
          </p>
          <input
            className="input"
            placeholder="My Awesome Question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button className="bubble-button border-radius " onClick={onSubmit}>
            <p className="legal is-white-always margin-0">Submit</p>
          </button>{" "}
        </>
      )}
    </div>
  )
}
const QandAView = ({ livePresenter, verified, submitQuestion }) => {
  if (livePresenter && verified) {
    return <QuestionReel />
  }
  return <QuestionForm submitQuestion={submitQuestion} />
}

const mapStateToProps = ({ livePresenter, verified }) => {
  return { livePresenter, verified }
}
const mapDispatchToProps = (dispatch) => {
  return {
    submitQuestion: (id, question) =>
      dispatch({ type: "server/question", data: { id, question } }),
  }
}

const ConnectedQandAView =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(QandAView)
    : QandAView

export default ConnectedQandAView

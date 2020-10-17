import React, { useState } from "react";
import { connect } from "react-redux";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Emojione } from "react-emoji-render";

let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase/app");
  require("firebase/firestore");
}

const QuestionCard = ({ question }) => {
  const [answered, setAnswered] = useState(false);

  return (
    <div className="">
      <button
        className={`${
          answered ? "text-secondary" : "bg-secondary text-link"
        } rounded py-1 px-2`}
        onClick={() => setAnswered(!answered)}
      >
        <p style={{ fontSize: 20 }}>{question}</p>
      </button>
    </div>
  );
};
const QuestionReel = ({ QAID }) => {
  const [value, loading, error] = useDocumentData(
    firebase.firestore().doc(`QandA/${QAID}`)
  );
  return (
    <div className="QA">
      <h4>Q&A Session</h4>
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data.</p>}

      {!loading && !error && value && value.questions && (
        <div style={{ height: "75vh", overflowY: "scroll" }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <div className="col-span-3">
              <p className="opacity-50" style={{ fontSize: 20 }}>
                {value.questions.length} questions asked.
              </p>
            </div>
            {value.questions.map((question) => (
              <QuestionCard question={question} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const QuestionForm = ({ submitQuestion, QAID }) => {
  const [submitted, setSubmitted] = useState(false);
  const [question, setQuestion] = useState("");
  const onSubmit = () => {
    if (question !== "") {
      submitQuestion(QAID, question);
      setSubmitted(true);
      setQuestion("");
    }
  };
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
          <p className="text-3xl">
            Want to ask me a question? It's anonymous{" "}
            <Emojione className="inline-block" text="💫" />.
          </p>
          <input
            className="input text-3xl"
            placeholder="My Awesome Question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button className="btn text-2xl" onClick={onSubmit}>
            Submit
          </button>{" "}
        </>
      )}
    </div>
  );
};
const QandAView = ({ livePresenter, verified, submitQuestion, QAID }) => {
  if (livePresenter && verified) {
    return <QuestionReel QAID={QAID} />;
  }
  return <QuestionForm submitQuestion={submitQuestion} QAID={QAID} />;
};

const mapStateToProps = ({ livePresenter, verified }) => {
  return { livePresenter, verified };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitQuestion: (id, question) =>
      dispatch({ type: "server/question", data: { id, question } }),
  };
};

const ConnectedQandAView =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(QandAView)
    : QandAView;

export default ConnectedQandAView;

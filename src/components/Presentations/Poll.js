
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocalStorage } from "../../utils/customHooks";

// Declaring poll question and answers
const pollQuestion = "Are you working from home?";
let starterPollAnswers = [
  { option: "Yes", votes: 0 },
  { option: "No", votes: 0 },
];

const PollView = ({
  polls,
  submitVote,
  question = pollQuestion,
  answers = starterPollAnswers,
  pollID,
}) => {
  const evaluatePoll = (polls) => {
    if (!polls) {
      return answers;
    }
    return answers.map(({ option }) => {
      if (polls[pollID] && polls[pollID][option]) {
        return {
          option,
          votes: polls[pollID][option],
        };
      }
      return {
        option,
        votes: 0,
      };
    });
  };
  const [pollAnswers, setPollAnswers] = useState(evaluatePoll(polls));
  const [userPollVotes, setUserPollVotes] = useLocalStorage(
    "userPollVotes",
    {}
  );
  const handleVote = (voteAnswer) => {
    setUserPollVotes({ ...userPollVotes, [pollID]: voteAnswer });
    submitVote(pollID, voteAnswer);
  };
  useEffect(() => {
    setPollAnswers(evaluatePoll(polls));
  }, [polls]);

  const totalVotes = pollAnswers.reduce((acc, cur) => {
    acc += cur.votes;
    return acc;
  }, 0);
  const submitted = userPollVotes[pollID] ? true : false;
  const userChoice = userPollVotes[pollID] ? userPollVotes[pollID] : "";
  return (
    <div className="poll max-w-2xl mx-auto text-secondary">
      <p className="font-bold">{question}</p>
      {!submitted ? (
        <div className="row fill-width grid grid-cols-2 gap-4">
          {answers.map(({ option }) => (
            <div className="col-xs-12 margin-2-b">
              <button className="btn w-full h-full" onClick={() => handleVote(option)}>
                <p>{option}</p>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="row w-full max-w-2xl mx-auto">
          {totalVotes > 0 ? (
            <>
              {pollAnswers.map(({ option, votes }) => (
                <div className="mb-4">
                  <div
                    className="bg-secondary w-full rounded"
                    style={{ position: "relative", height: 70 }}
                  >
                    <div
                      className="bg-accent rounded poll"
                      style={{
                        position: "absolute",
                        zIndex: 1000,
                        height: "100%",
                        width: `${Math.floor((votes / totalVotes) * 100)}%`,
                      }}
                    ></div>
                    <div
                      className="w-full flex items-center p-1"
                      style={{
                        position: "absolute",
                        zIndex: 1100,
                        height: "100%",
                      }}
                    >
                      <p
                        className={`mr-4 text-primary text-xl sm:text-3xl md:text-4xl ${
                          userChoice === option ? "font-bold" : ""
                        }`}
                      >
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
      <p className="opacity-70 text-center">{totalVotes} votes submitted</p>
    </div>
  );
};

const mapStateToProps = ({ polls }) => {
  return { polls };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitVote: (id, vote) =>
      dispatch({ type: "server/poll", data: { id, vote } }),
  };
};

const ConnectedPollView =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(PollView)
    : PollView;

export default ConnectedPollView;
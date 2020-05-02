/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useState, useRef } from "react"
import { connect } from "react-redux"
import { navigate } from "gatsby"
import ReactTooltip from "react-tooltip"
import Context from "../context"
import useDeck from "../hooks/use-deck"
import useSwipe from "../hooks/use-swipe"
import { modes } from "../constants"
import Logo from "../images/Logo.svg"
import Question from "../images/question.svg"
import Broadcast from "../images/broadcast.svg"
import BroadcastOff from "../images/broadcast-off.svg"

const toggleMode = (next) => (state) =>
  state.mode === next
    ? {
        mode: modes.normal,
      }
    : {
        mode: next,
      }

export const Slide = ({
  sayHello,
  livePresenter,
  follow,
  shouldfollow,
  verfication,
  verified,
  slide,
  index,
  preview,
  frontmatter,
  length,
  ...props
}) => {
  const outer = useDeck()
  const swipeProps = useSwipe()
  const context = {
    ...outer,
    index,
    preview,
  }

  const followButton = useRef(null)
  const [password, setPassword] = useState("")

  const onChange = (e) => setPassword(e.target.value)
  return (
    <>
      <Context.Provider value={context}>
        <ReactTooltip className="info-tooltip" place="right" />
        {context.mode === "MASTER" && !verified && (
          <div
            className="flex align-horizontal align-vertical"
            style={{
              position: "absolute",
              zIndex: 200,
              top: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#00000050",
            }}
          >
            <div
              className="is-white-bg is-grey pad-5 border-radius"
              style={{ minWidth: "30vw" }}
            >
              <h1 className="margin-0-t margin-2-b">Ready to go live?</h1>
              <h4 className="margin-0">Enter the password:</h4>
              <input
                className="input"
                type="password"
                value={password}
                onChange={onChange}
              ></input>
              <div className="row">
                <div className="col-xs-6">
                  <button
                    className="bubble-button is-green-bg"
                    style={{ width: "100%" }}
                    onClick={() =>
                      verfication(password, frontmatter.path, index)
                    }
                  >
                    Submit
                  </button>
                </div>
                <div className="col-xs-6">
                  <button
                    className="bubble-button is-red-bg"
                    style={{ width: "100%" }}
                    onClick={() => {
                      context.setState(toggleMode(modes.normal))
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: 0,
            height: 5,
            zIndex: 100,
            width: `${index !== 0 ? ((index + 1) / length) * 100 : 0}vw`,
          }}
          className="is-pink-bg"
        />
        <div
          {...(!preview ? swipeProps : {})}
          className="pres-layout light-mode"
          sx={{
            boxSizing: "border-box",
            width: "100%",
            height: context.mode === modes.print ? "100vh" : "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
            color: "text",
            bg: "background",
            variant: "styles.Slide",
          }}
        >
          {slide}

          <button
            style={{ position: "fixed", bottom: 20, right: 30 }}
            onClick={() => navigate("/presentations")}
          >
            <img src={Logo} style={{ height: 21 }} />
          </button>
          <div style={{ position: "fixed", bottom: 10, left: 20 }}>
            <img
              data-tip={`Use arrow keys or swipe to navigate between slides. Press 'esc' or click my logo to exit.`}
              src={Question}
              style={{ height: 30 }}
            />
            {livePresenter && (
              <>
                <button
                  ref={followButton}
                  onClick={(e) => {
                    shouldfollow(!follow)
                    e.currentTarget.blur()
                  }}
                  style={{ marginLeft: 15 }}
                >
                  <img
                    src={follow ? Broadcast : BroadcastOff}
                    style={{ height: 30 }}
                    className="grow"
                  />
                </button>
              </>
            )}
          </div>
          <div
            className="text-align-center"
            style={{ position: "fixed", bottom: 20 }}
          >
            <p style={{ fontSize: 15 }} className="margin-0 is-grey opacity-50">
              {index + 1}/{length}
            </p>
          </div>
        </div>
      </Context.Provider>
    </>
  )
}

const mapStateToProps = ({ livePresenter, follow, verified }) => {
  return { livePresenter, follow, verified }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sayHello: () => dispatch({ type: "server/hello", data: "Hello!" }),
    shouldfollow: (value) => dispatch({ type: "follow", data: value }),
    verfication: (password, location, index) =>
      dispatch({
        type: "server/verify",
        data: {
          password,
          location,
          index,
        },
      }),
  }
}

const ConnectedSlide =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(Slide)
    : Slide

export default ConnectedSlide

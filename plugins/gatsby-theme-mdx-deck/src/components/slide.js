/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useState, useRef } from "react"
import { connect } from "react-redux"
import { navigate } from "gatsby"
import { useCookies } from "react-cookie"
import ReactTooltip from "react-tooltip"
import Context from "../context"
import useDeck from "../hooks/use-deck"
import useSwipe from "../hooks/use-swipe"
import { modes } from "../constants"
import Logo from "../images/Logo.svg"
import Question from "../images/question.svg"
import Broadcast from "../images/broadcast.svg"
import BroadcastOff from "../images/broadcast-off.svg"
import Stop from "../images/stop.svg"
import Close from "../images/close.svg"

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
  stopPres,
  verfication,
  verified,
  slide,
  presentation,
  index,
  preview,
  frontmatter,
  length,
  ...props
}) => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const outer = useDeck()
  const swipeProps = useSwipe()
  const context = {
    ...outer,
    index,
    preview,
  }
  const [password, setPassword] = useState("")
  const TourActive = !cookies.SLDPresTourCookie

  const onChange = (e) => setPassword(e.target.value)
  return (
    <>
      <Context.Provider value={context}>
        <ReactTooltip className="info-tooltip" />
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
          className="pres-layout light-mode stepTwo stepThree"
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
          <img
            src={Logo}
            data-tip={`This presentation was made by Sam Larsen-Disney`}
            style={{ position: "fixed", height: 18, bottom: 20, right: 20 }}
          />
          <button
            className=""
            style={{}}
            onClick={() => navigate("/presentations")}
          >
            <img
              src={Close}
              className="grow stepFour"
              data-tip={`Close`}
              style={{
                position: "fixed",
                height: "100%",
                top: 12,
                right: 15,
                height: 30,
              }}
            />
          </button>
          <div style={{ position: "fixed", bottom: 10, left: 20 }}>
            <button onClick={() => removeCookie("SLDPresTourCookie")}>
              <img
                src={Question}
                style={{ height: 30 }}
                className="stepOne grow"
                data-tip={`Help`}
              />
            </button>
            {((livePresenter &&
              window.location.pathname.includes(presentation.deck)) ||
              TourActive === true) && (
              <>
                {verified ? (
                  <button
                    onClick={(e) => {
                      context.setState(toggleMode(modes.normal))
                      stopPres()
                      e.currentTarget.blur()
                    }}
                    style={{ marginLeft: 15 }}
                  >
                    <img src={Stop} style={{ height: 30 }} className="grow" />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      shouldfollow(!follow)
                      e.currentTarget.blur()
                    }}
                    style={{ marginLeft: 15 }}
                    className="stepFive"
                    disabled={TourActive}
                    data-tip={
                      follow
                        ? "Review at your own pace."
                        : "Follow presentation."
                    }
                  >
                    <img
                      src={follow ? Broadcast : BroadcastOff}
                      style={{ width: 22 }}
                      className="grow"
                    />
                  </button>
                )}
              </>
            )}
          </div>
          <div
            className="text-align-center stepSix"
            style={{ position: "fixed", bottom: 20 }}
            data-tip={`You're on slide ${index + 1} of ${length}`}
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

const mapStateToProps = ({ livePresenter, follow, verified, presentation }) => {
  return { livePresenter, follow, verified, presentation }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sayHello: () => dispatch({ type: "server/hello", data: "Hello!" }),
    shouldfollow: (value) => dispatch({ type: "follow", data: value }),
    stopPres: () => dispatch({ type: "server/endPres" }),
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

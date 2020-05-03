/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { useState, useRef } from "react"
import { connect } from "react-redux"
import { navigate } from "gatsby"
import ReactTooltip from "react-tooltip"
import { useCookies } from "react-cookie"
import Joyride from "react-joyride"
import Context from "../context"
import useDeck from "../hooks/use-deck"
import useSwipe from "../hooks/use-swipe"
import { modes } from "../constants"
import Logo from "../images/Logo.svg"
import Question from "../images/question.svg"
import Broadcast from "../images/broadcast.svg"
import BroadcastOff from "../images/broadcast-off.svg"
import Stop from "../images/stop.svg"

const toggleMode = (next) => (state) =>
  state.mode === next
    ? {
        mode: modes.normal,
      }
    : {
        mode: next,
      }

const steps = [
  {
    target: ".stepTwo",
    content:
      "Welcome to the presentation! It looks like your first time here so let me explain a few things.",
    placement: "center",
  },
  {
    target: ".stepThree",
    content: "Swipe or use your arrow keys to navigate between the slides.",
    placement: "top-end",
  },
  {
    target: ".stepFour",
    content: "Tap or click here to exit the presentation at any time.",
    placement: "top-end",
  },
  {
    target: ".stepSix",
    content:
      "Here you can see the current slide and the total number of slides in the deck.",
    placement: "top-end",
  },
  {
    target: ".stepFive",
    content:
      "While I'm presenting, you can tap or click here to review the slides at your own pace.",
    placement: "top-end",
  },
  {
    target: ".stepOne",
    content: "Tap or click here at any time to see these instructions again.",
    placement: "top",
  },
]

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
  const tourCB = (e) => {
    console.log(e)
    if (e.action === "reset" || e.action === "close") {
      setCookie("SLDPresTourCookie", true)
    }
  }
  const onChange = (e) => setPassword(e.target.value)
  return (
    <>
      <Context.Provider value={context}>
        <ReactTooltip className="info-tooltip" place="right" />
        <Joyride
          steps={steps}
          run={TourActive}
          showSkipButton={true}
          continuous={true}
          callback={tourCB}
          disableOverlayClose={true}
          styles={{
            options: {
              arrowColor: "#fff",
              backgroundColor: "#fff",
              primaryColor: "#ea4e68",
              textColor: "#2e4052",
            },
          }}
        />
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

          <button
            className="stepFour"
            style={{ position: "fixed", bottom: 20, right: 30 }}
            onClick={() => navigate("/presentations")}
          >
            <img src={Logo} style={{ height: 21 }} />
          </button>
          <div style={{ position: "fixed", bottom: 10, left: 20 }}>
            <button onClick={() => removeCookie("SLDPresTourCookie")}>
              <img src={Question} style={{ height: 30 }} className="stepOne" />
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

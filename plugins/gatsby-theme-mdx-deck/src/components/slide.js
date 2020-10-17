/** @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { useCookies } from "react-cookie";
import ReactTooltip from "react-tooltip";
import Context from "../context";
import useDeck from "../hooks/use-deck";
import useSwipe from "../hooks/use-swipe";
import { modes } from "../constants";
import Logo from "../images/Logo.svg";
import Question from "../images/question.svg";
import Broadcast from "../images/broadcast.svg";
import BroadcastOff from "../images/broadcast-off.svg";
import Stop from "../images/stop.svg";
import MinThemeWrapper from "../../../../src/components/minThemeWrapper";
const toggleMode = (next) => (state) =>
  state.mode === next
    ? {
        mode: modes.normal,
      }
    : {
        mode: next,
      };

export const Slide = ({
  sayHello,
  livePresenter,
  follow,
  count,
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
  const [cookies, setCookie, removeCookie] = useCookies();
  const outer = useDeck();
  const swipeProps = useSwipe();
  const context = {
    ...outer,
    index,
    preview,
  };
  const [password, setPassword] = useState("");
  const TourActive = !cookies.SLDPresTourCookie;

  const onChange = (e) => setPassword(e.target.value);
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
              className="bg-default text-default pad-5 border-radius"
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
                      context.setState(toggleMode(modes.normal));
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
          className="bg-accent"
        />

        <div
          {...(!preview ? swipeProps : {})}
          id="pres-slide"
          className="bg-default text-default presentation stepTwo stepThree py-6 px-12 py-8 md:py-32 lg:py-64 md:px-32 lg:px-64 "
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
            variant: "styles.Slide",
          }}
        >
          {slide}
          <img
            src={Logo}
            data-tip={`This presentation was made by Sam Larsen-Disney`}
            style={{ position: "fixed", height: 18, bottom: 20, right: 20 }}
          />
          <MinThemeWrapper />
          <div
            style={{ position: "fixed", bottom: 10, left: 20 }}
            className="flex align-horizontal"
          >
            <button onClick={() => removeCookie("SLDPresTourCookie")}>
              <p className="text-4xl">
                <i
                  className={`stepOne grow las la-question-circle`}
                  data-tip={`Help`}
                ></i>
              </p>
            </button>
            {((livePresenter &&
              window.location.pathname.includes(presentation.deck)) ||
              TourActive === true) && (
              <>
                {verified ? (
                  <>
                    <button
                      onClick={(e) => {
                        context.setState(toggleMode(modes.normal));
                        stopPres();
                        e.currentTarget.blur();
                      }}
                      style={{ marginLeft: 15 }}
                    >
                      <img
                        data-tip={`Stop`}
                        src={Stop}
                        style={{ height: 30 }}
                        className="grow margin-2-r"
                      />
                    </button>
                    <p
                      data-tip={`Viewers`}
                      className="is-grey margin-3-t opacity-50"
                      style={{ fontSize: 30 }}
                    >
                      {count}
                    </p>
                  </>
                ) : (
                  <button
                    onClick={(e) => {
                      shouldfollow(!follow);
                      e.currentTarget.blur();
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
                    <p className="text-4xl">
                      <i
                        className={`las ${follow ? "la-lock" : "la-lock-open"}`}
                      ></i>
                    </p>
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
  );
};

const mapStateToProps = ({
  livePresenter,
  follow,
  count,
  verified,
  presentation,
}) => {
  return { livePresenter, follow, count, verified, presentation };
};

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
  };
};

const ConnectedSlide =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(Slide)
    : Slide;

export default ConnectedSlide;

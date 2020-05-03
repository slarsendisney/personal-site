import React, { useReducer } from "react"
import merge from "lodash.merge"
import Joyride from "react-joyride"
import { useCookies } from "react-cookie"
import Context from "../context"
import { modes } from "../constants"

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

const reducer = (state, next) =>
  typeof next === "function"
    ? merge({}, state, next(state))
    : merge({}, state, next)

export default (props) => {
  const [state, setState] = useReducer(reducer, {
    mode: modes.normal,
    step: 0,
    metadata: {},
  })
  const [cookies, setCookie, removeCookie] = useCookies()
  const TourActive = !cookies.SLDPresTourCookie

  const tourCB = (e) => {
    console.log(e)
    if (e.action === "reset" || e.action === "close") {
      setCookie("SLDPresTourCookie", true)
    }
  }

  const register = (index, key, value) => {
    if (state.metadata[index] && state.metadata[index][key]) return
    setState({
      metadata: {
        [index]: {
          [key]: value,
        },
      },
    })
  }

  const context = {
    ...state,
    setState,
    register,
  }

  return (
    <Context.Provider value={context}>
      {" "}
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
      {props.children}
    </Context.Provider>
  )
}

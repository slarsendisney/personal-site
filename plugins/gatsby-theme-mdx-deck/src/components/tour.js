import React from "react"
import Joyride from "react-joyride"
import { useCookies } from "react-cookie"
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
    placement: "top",
  },
  {
    target: ".stepFour",
    content: "Tap or click here to exit the presentation at any time.",
    placement: "bottom-end",
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

export default () => {
  const [cookies, setCookie] = useCookies()
  const TourActive = !cookies.SLDPresTourCookie
  const tourCB = (e) => {
    if (e.action === "reset" || e.action === "close") {
      setCookie("SLDPresTourCookie", true)
    }
  }
  return (
    <Joyride
      steps={
        typeof window !== `undefined`
          ? window.location.pathname.includes("slides")
            ? steps
            : []
          : []
      }
      run={TourActive}
      showSkipButton={true}
      continuous={true}
      callback={tourCB}
      showProgress={true}
      disableCloseOnEsc={true}
      disableOverlayClose={true}
      styles={{
        options: {
          arrowColor: "#fff",
          backgroundColor: "#fff",
          primaryColor: "#ea4e68",
          textColor: "#2e4052",
          zIndex: 1000,
        },
      }}
    />
  )
}

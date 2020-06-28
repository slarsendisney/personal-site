import { navigate } from "gatsby"
import wrapWithProvider from "./src/state/wrapWithProvider"
import "./src/styles/global.scss"
import WorkWithMe from "./scripts/work_with_me"

let firebase

if (typeof window !== "undefined") {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_SB,
    messagingSenderId: process.env.FIREBASE_MSG_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  }
  firebase = require("firebase/app")
  firebase.initializeApp(config)
  WorkWithMe()
}

const handleEsc = (event) => {
  if (event.keyCode === 27) {
    if (window.location.pathname.includes("decks")) {
      navigate("/presentations")
    } else {
      navigate("/")
    }
  }
}

window.addEventListener("keydown", handleEsc)

export const wrapRootElement = wrapWithProvider

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (window.location.pathname.includes("decks")) {
    document.getElementsByTagName("BODY")[0].className = "light-mode"
  }
}

export const onClientEntry = async () => {
  if (typeof IntersectionObserver === "undefined") {
    await import("intersection-observer")
    console.log("IntersectionObserver polyfilled ;)")
  }
}

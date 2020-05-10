import { navigate } from "gatsby"
import "firebase/firestore"
import wrapWithProvider from "./src/state/wrapWithProvider"
import "./src/styles/global.scss"

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

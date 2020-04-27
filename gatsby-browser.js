const { navigate } = require("gatsby")
require("./src/styles/global.scss")

const handleEsc = event => {
  if (event.keyCode === 27) {
    if (window.location.pathname.includes("decks")) {
      navigate("/presentations")
    } else {
      navigate("/")
    }
  }
}

window.addEventListener("keydown", handleEsc)

exports.onRouteUpdate = ({ location, prevLocation }) => {
  if (window.location.pathname.includes("decks")) {
    document.getElementsByTagName("BODY")[0].className = "light-mode"
  }
}

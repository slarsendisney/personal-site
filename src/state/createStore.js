import { createStore, applyMiddleware } from "redux"
import createSocketIoMiddleware from "redux-socket.io"
import io from "socket.io-client"
let socket = io("https://sld-clicker.herokuapp.com/")
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/")

function reducer(
  state = {
    livePresenter: false,
    follow: true,
    verified: false,
  },
  action
) {
  switch (action.type) {
    case "follow":
      return Object.assign({}, { ...state, follow: action.data })
    case "verify":
      return Object.assign({}, { ...state, verified: action.data })
    case "updatePresIndex": {
      return Object.assign({}, { ...state, presentation: action.data })
    }
    case "startLivePresentor":
      return Object.assign(
        {},
        { ...state, livePresenter: true, presentation: action.data }
      )
    case "endLivePresentor":
      return Object.assign(
        {},
        {
          ...state,
          livePresenter: false,
          presentation: undefined,
          verified: false,
        }
      )
    default:
      return state
  }
}
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer)
store.subscribe(() => {})

export default store

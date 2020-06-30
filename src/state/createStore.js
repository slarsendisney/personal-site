import { createStore, applyMiddleware } from "redux"
import createSocketIoMiddleware from "redux-socket.io"
import io from "socket.io-client"
let socket = io("https://sld-clicker.herokuapp.com/") //io("http://localhost:3000/")
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/")

function reducer(
  state = {
    donationActive: false,
    livePresenter: false,
    follow: true,
    verified: false,
    count: 0,
  },
  action
) {
  console.log({ action })
  switch (action.type) {
    case "donation": {
      return Object.assign(
        {},
        { ...state, donationActive: true, donation: action.data }
      )
    }
    case "donationEnds": {
      return Object.assign(
        {},
        { ...state, donationActive: false, donation: undefined }
      )
    }
    case "userCount":
      return Object.assign({}, { ...state, count: action.data })
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
store.subscribe(() => {
  console.log("new client state", store.getState())
})

export default store

import { createStore, applyMiddleware } from "redux"
import createSocketIoMiddleware from "redux-socket.io"
import io from "socket.io-client"
let socket = io("http://localhost:3000")
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/")

function reducer(
  state = {
    presenter: true,
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
    default:
      return state
  }
}
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer)
store.subscribe(() => {
  console.log("new client state", store.getState())
})

export default store

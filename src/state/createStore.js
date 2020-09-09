import { createStore, applyMiddleware } from "redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import urls from "../data/urls.json";
let socket = io(urls.api); //io("http://localhost:3000/")
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const DEVELOPMENT = true;

function reducer(
  state = {
    donationActive: false,
    count: 0,
    polls: [],
  },
  action
) {
  switch (action.type) {
    case "donation": {
      return Object.assign(
        {},
        { ...state, donationActive: true, donation: action.data }
      );
    }
    case "donationEnds": {
      return Object.assign(
        {},
        { ...state, donationActive: false, donation: undefined }
      );
    }
    case "foundTheme":
      console.log(action.data);
      return Object.assign({}, { ...state, newTheme: action.data });
    case "dismissNewTheme":
      delete state.newTheme;
      return Object.assign({}, { ...state });
    case "userCount":
      return Object.assign({}, { ...state, count: action.data });
    case "pollUpdate": {
      return Object.assign({}, { ...state, polls: action.data });
    }
    default:
      return state;
  }
}
let store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);
store.subscribe(() => {
  if (DEVELOPMENT) {
    console.log("new client state", store.getState());
  }
});

export default store;

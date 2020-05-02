import React from "react"
import { Provider } from "react-redux"

import createStore from "./createStore"

export default ({ element }) => {
  return (
    <Provider store={createStore}>
      {console.log("provider")}
      {element}
    </Provider>
  )
}

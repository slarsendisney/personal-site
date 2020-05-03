import React from "react"
import { Provider } from "react-redux"
import { CookiesProvider } from "react-cookie"

import createStore from "./createStore"

export default ({ element }) => {
  return (
    <Provider store={createStore}>
      <CookiesProvider>{element}</CookiesProvider>
    </Provider>
  )
}

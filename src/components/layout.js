import React from "react"
import PropTypes from "prop-types"

import Header from "./header"

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="">
        <main>{children}</main>
        <footer className="is-white-bg is-grey margin-2">
          Made with ❤️ by Sam Larsen-Disney
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"

const Layout = ({ children }) => {
  return (
    <div style={{}}>
      <Header />
      <main className="is-light-grey-bg">{children}</main>
      <footer className="is-white-bg is-grey pad-2 footer">
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by Sam Larsen-Disney
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"

const Layout = ({ children }) => {
  return (
    <div className="is-white">
      <Header />
      <div className="">
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}, Samuel Larsen-Disney</footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

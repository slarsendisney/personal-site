import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

import Header from "./header"

const Layout = ({ children }) => {
  return (
    <div style={{}}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/css/line-awesome.min.css"
        />
      </Helmet>
      <Header />
      <main className="is-light-grey-bg">{children}</main>
      <footer className="is-white-bg is-grey pad-2 footer">
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by Sam Larsen-Disney
        <br />
        <p className="legal">
          All views expressed on this site are my own and do not represent the
          opinions of any entity whatsover with which I have been, am now or
          will be affilated with.
        </p>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import CookieConsent from "react-cookie-consent"
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
      <CookieConsent
        location="bottom"
        buttonText="Got it"
        acceptOnScroll={true}
        cookieName="SLDConsentCookie"
        style={{ background: "#ea4e68" }}
        buttonStyle={{
          color: "#ea4e68",
          fontSize: "13px",
          background: "#fff",
          fontFamily: "lato",
          borderRadius: 3,
          padding: 10,
        }}
      >
        <h4 className="margin-0">
          This website uses cookies{" "}
          <span role="img" aria-label="cookies">
            🍪
          </span>{" "}
          so I can enhance the user experience. Hope thats cool with you!
        </h4>
      </CookieConsent>
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

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import CookieConsent from "react-cookie-consent"
import { Location } from "@reach/router"
import Header from "./header"
import Footer from "./Footer"

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
          This website uses cookies so I can enhance the user experience. Hope
          that's cool with you!
        </h4>
      </CookieConsent>

      <Header />

      <main className="is-light-grey-bg is-grey">{children}</main>
      <Location>{(locationProps) => <Footer {...locationProps} />}</Location>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import PropTypes from "prop-types";
import React from "react";
import Header from "./header";
import { Helmet } from "react-helmet";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-default">
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/css/line-awesome.min.css"
        />
      </Helmet>
      <Header />

      <main className="text-default ">{children}</main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

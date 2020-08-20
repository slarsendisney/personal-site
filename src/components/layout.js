import PropTypes from "prop-types";
import React from "react";

import Header from "./header";
import { Helmet } from "react-helmet";

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

      <footer className="text-primary bg-primary">
        <nav className="flex justify-between max-w-4xl p-4 mx-auto text-sm md:p-8">
          <p className="">
            <strong>Site Stats</strong>
          </p>
          <p>
            <a
              className="font-bold  no-underline"
              href="https://github.com/taylorbryant/gatsby-starter-tailwind"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </nav>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

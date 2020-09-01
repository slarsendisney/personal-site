import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";

import createStore from "./createStore";

const WrapProvider = ({ element }) => {
  return (
    <Provider store={createStore}>
      <CookiesProvider>{element}</CookiesProvider>
    </Provider>
  );
};

WrapProvider.propTypes = {
  element: PropTypes.node.isRequired,
};

export default WrapProvider;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ThemeFound = ({ newTheme, setTheme, dismissNewTheme }) => {
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    if (newTheme) {
      setModalOpen(true);
    }
  }, [newTheme]);
  const themeVal = newTheme ? newTheme.toLowerCase().replaceAll(" ", "") : "";
  return (
    <>
      {modalOpen && (
        <div
          className="bg-modal fixed top-0 right-0 w-full h-full flex items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          <div
            className="w-auto h-auto bg-default text-secondary rounded-lg p-8  border-4 border-accent"
            style={{ maxWidth: "75%" }}
          >
            {" "}
            <div className="flex items-center justify-center">
              <div
                className={`h-8 w-8 bg-primary rounded-full my-2 mr-2 md:my-0 theme-${themeVal} border-4 border-accent`}
              />
              <h1 className="text-xl font-bold text-center">Theme Unlocked!</h1>
            </div>
            <p className="text-xl text-center mt-1 mb-6">
              You&apos;ve unlocked the{" "}
              <span className="text-link font-semibold">{newTheme}</span> theme.
              Want to give the site a new lick of paint? You can also
            </p>
            <div className="flex flex-wrap justify-center my-3">
              {" "}
              <button
                className="btn-accent text-sm mr-2"
                onClick={() => {
                  setTheme(
                    `theme-${newTheme.toLowerCase().replaceAll(" ", "")}`
                  );
                  setModalOpen(false);
                  dismissNewTheme();
                }}
              >
                Paint It
              </button>
              <button
                className="btn-accent text-sm"
                onClick={() => {
                  setModalOpen(false);
                  dismissNewTheme();
                }}
              >
                No Thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
ThemeFound.propTypes = {
  newTheme: PropTypes.string,
  setTheme: PropTypes.func.isRequired,
  dismissNewTheme: PropTypes.func.isRequired,
};
const mapStateToProps = ({ newTheme }) => {
  return { newTheme };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dismissNewTheme: () => dispatch({ type: "dismissNewTheme" }),
  };
};

const ThemeFoundModal =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(ThemeFound)
    : ThemeFound;

export default ThemeFoundModal;

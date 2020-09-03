import React, { useState } from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "../utils/customHooks";
import { defaultTheme } from "./header";
const ThemeFound = ({ children, theme }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currenttheme, setTheme] = useLocalStorage("theme", defaultTheme);
  const [unlockedThemes, setUnlockedThemes] = useLocalStorage(
    "unlocked_themes",
    []
  );

  const updateTheme = (newTheme) => {
    var currentCss = document.body.className;
    currentCss = currentCss.replace(/theme-\w*/g, "") + newTheme;
    document.body.className = currentCss;
    window.theme = newTheme;
  };
  const setFound = () => {
    const unlocked = new Set(unlockedThemes);
    if (!unlocked.has(theme)) {
      console.log("Found theme!");
      setUnlockedThemes([...unlockedThemes, theme]);
      setModalOpen(true);
    } else {
      console.log("Theme already found!");
    }
  };
  return (
    <>
      {modalOpen && (
        <div
          className="bg-modal fixed top-0 right-0 w-full h-full flex items-center justify-center"
          style={{ zIndex: 1000 }}
        >
          <div className="w-auto h-auto bg-secondary rounded p-8">
            {" "}
            <div className="flex items-center justify-center">
              <i className="las la-paint-roller text-4xl mb-3"></i>{" "}
              <h1 className="text-lg text-center">Theme Unlocked!</h1>
            </div>
            <p className="text-xl my-2">
              You&apos;ve unlocked the{" "}
              <span className="text-link font-semibold">{theme}</span> theme.
              Want to give the site a new lick of paint?
            </p>
            <div className="flex flex-wrap justify-center my-3">
              {" "}
              <button
                className="btn-accent text-sm mr-2"
                onClick={() => {
                  const newTheme = `theme-${theme
                    .toLowerCase()
                    .replaceAll(" ", "")}`;
                  setTheme(newTheme);
                  updateTheme(newTheme);
                  setModalOpen(false);
                }}
              >
                Paint It
              </button>
              <button
                className="btn-accent text-sm"
                onClick={() => {
                  console.log(`Keeping theme ${currenttheme}`);
                  setModalOpen(false);
                }}
              >
                No Thanks
              </button>
            </div>
          </div>
        </div>
      )}
      <span onClick={() => setFound()}>{children}</span>
    </>
  );
};
ThemeFound.propTypes = {
  children: PropTypes.node.isRequired,
  found: PropTypes.bool,
  theme: PropTypes.string.isRequired,
};
export default ThemeFound;

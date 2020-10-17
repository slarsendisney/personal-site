import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../utils/customHooks";
import SmoothCollapse from "react-smooth-collapse";
import { navigate } from "gatsby";
import ThemePicker from "./themePicker";
import { Helmet } from "react-helmet";

export const defaultTheme =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "theme-midnightdreams"
    : "theme-blue";

const Header = () => {
  const [theme, setTheme] = useLocalStorage("theme", defaultTheme);
  const [themeExpanded, setThemeExpanded] = useState(false);
  const [unlockedThemes, setUnlockedThemes] = useLocalStorage(
    "unlocked_themes",
    []
  );
  useEffect(() => {
    var currentCss = document.getElementById("___gatsby").className;
    currentCss = currentCss.replace(/theme-\w*/g, "") + theme;
    document.getElementById("___gatsby").className = currentCss;
    if (typeof window !== "undefined") {
      window.theme = theme;
    }
  }, [theme]);

  return (
    <div
      className="w-full"
      style={{
        position: "absolute",
        top: 0,
      }}
    >
      <Helmet>
        <link
          rel="stylesheet"
          href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/css/line-awesome.min.css"
          data-react-helmet="true"
        />
      </Helmet>
      <div className="">
        <SmoothCollapse expanded={themeExpanded} className="">
          <div className="bg-white flex flex-wrap items-center justify-between px-4 py-1 mx-auto mx-auto">
            <div className="flex  sm:items-start text-grey m-auto md:m-0"></div>
            <div className="md:-mt-4">
              <ThemePicker
                theme={theme}
                setTheme={setTheme}
                unlockedThemes={unlockedThemes}
                small
              />
            </div>
          </div>
        </SmoothCollapse>
      </div>
      <div className="flex mt-2 justify-between w-full px-2">
        <button
          className="ml-2"
          onClick={() => {
            navigate("/presentations");
          }}
        >
          <p className="text-4xl font-bold mt-0 mb-0">
            <i className={`stepFour las la-door-open`}></i>
          </p>
        </button>
        <button
          aria-label="Theme Changer"
          className="mr-2"
          onClick={() => {
            setThemeExpanded(!themeExpanded);
          }}
        >
          <p className="text-4xl font-bold  mt-0 mb-0">
            <i
              className={`stepSix las ${
                !themeExpanded ? "la-paint-roller" : "la-times-circle"
              }`}
            ></i>
          </p>
        </button>
      </div>
    </div>
  );
};

export default Header;

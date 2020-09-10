import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ThemePicker from "./themePicker";
import { useLocalStorage } from "../utils/customHooks";
import LogoAnimation from "./LogoAnimation";
import SmoothCollapse from "react-smooth-collapse";
import ThemeFoundModal from "./ThemeFound";

export const defaultTheme =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "theme-midnightdreams"
    : "theme-blue";

const Header = ({ newTheme }) => {
  const [theme, setTheme] = useLocalStorage("theme", defaultTheme);
  const [themeExpanded, setThemeExpanded] = useState(false);
  const [menuExpanded, toggleMenuExpansion] = useState(false);
  const [unlockedThemes, setUnlockedThemes] = useLocalStorage(
    "unlocked_themes",
    []
  );

  useEffect(() => {
    var currentCss = document.body.className;
    currentCss = currentCss.replace(/theme-\w*/g, "") + theme;
    document.body.className = currentCss;
    if (typeof window !== "undefined") {
      window.theme = theme;
    }
  }, [theme]);

  useEffect(() => {
    let currentUnlocks = new Set(unlockedThemes);
    if (newTheme && !currentUnlocks.has(newTheme)) {
      setUnlockedThemes([...unlockedThemes, newTheme]);
    }
  }, [newTheme]);

  return (
    <>
      <ThemeFoundModal setTheme={setTheme} />
      <div className="bg-white">
        <SmoothCollapse expanded={themeExpanded} className="">
          <div className=" flex flex-wrap items-center justify-between container px-4 py-3 mx-auto mx-auto">
            <div className="flex flex-col items-center sm:items-start text-grey m-auto md:m-0">
              <p className="text-sm md:text-base mb-0">
                {unlockedThemes.length > 1 ? (
                  <>
                    Choose a new <strong>lick of paint</strong>.{" "}
                  </>
                ) : (
                  <>
                    <strong>Find more themes</strong> by exploring the site.
                  </>
                )}
              </p>
            </div>
            <ThemePicker
              theme={theme}
              setTheme={setTheme}
              unlockedThemes={unlockedThemes}
            />
          </div>
        </SmoothCollapse>
      </div>
      <header className="bg-primary">
        <div className="flex flex-wrap items-center justify-between container px-4 py-3 mx-auto mx-auto ">
          <Link to="/">
            <LogoAnimation />
          </Link>

          <div className="flex items-center">
            <button
              aria-label="Theme Changer"
              className="ml-2"
              onClick={() => {
                setThemeExpanded(!themeExpanded);
                toggleMenuExpansion(false);
              }}
            >
              <h1 className="text-2xl font-bold  mt-0 mb-0 text-primary">
                <i
                  className={`las ${
                    !themeExpanded ? "la-paint-roller" : "la-times-circle"
                  }`}
                ></i>
              </h1>
            </button>
            <button
              aria-label="Toggle Menu"
              className="ml-2"
              onClick={() => {
                setThemeExpanded(false);
                toggleMenuExpansion(!menuExpanded);
              }}
            >
              <h1 className="text-2xl font-bold  mt-0 mb-0 text-primary">
                <i
                  className={`las ${
                    !menuExpanded ? "la-bars" : "la-times-circle"
                  } `}
                ></i>
              </h1>
            </button>
          </div>
        </div>
      </header>
      <SmoothCollapse expanded={menuExpanded} className="">
        <div className="bg-secondary text-secondary">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 -mx-4">
              {[
                {
                  section: "Basics",
                  icon: "atom",
                  elements: [
                    { title: "About Me", link: "/about" },
                    { title: "Events", link: "/events" },
                    { title: "Projects", link: "/projects" },
                    { title: "CV", link: "/cv" },
                    { title: "Presentations", link: "/presentations" },
                  ],
                },
                {
                  section: "ToolKit",
                  icon: "toolbox",
                  elements: [
                    { title: "Articles", link: "/articles" },
                    { title: "Boilerplates", link: "/boilerplates" },
                    { title: "Uses", link: "/uses" },
                    {
                      title: "Hackathons",
                      link: "/hack",
                    },
                  ],
                },
                {
                  section: "Extras",
                  icon: "coffee",
                  elements: [
                    { title: "Statistics", link: "/stats" },
                    { title: "Search", link: "/search" },
                    { title: "Newsletter", link: "/newsletter" },
                    { title: "Sponsor", link: "/sponsor" },
                  ],
                },
              ].map(({ section, elements, icon }) => (
                <div
                  className="px-4 mx-3 my-4 border-t-2 md:border-2 border-link md:rounded"
                  key={section}
                >
                  <div className="flex items-center -mt-4 mb-3 md:mb-0 text-link ">
                    <p className="text-xl m-0 px-1 inline-block bg-secondary">
                      <i className={`las la-${icon}`}></i>
                    </p>
                    <h4 className="text-sm  font-bold inline-block pr-1 bg-secondary">
                      {section.toUpperCase()}
                    </h4>
                  </div>
                  <ul className="hidden lg:flex flex-wrap">
                    {elements.map(({ title, link }) => (
                      <li className="mb-2 mr-3" key={section + title}>
                        <Link
                          to={link}
                          className={`${
                            typeof window !== "undefined" &&
                            window.location.pathname.includes(link)
                              ? "text-link font-semibold"
                              : "hover:text-link"
                          }`}
                        >
                          <p className="text-base font-semibold">{title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <ul className="grid grid-cols-2 lg:hidden">
                    {elements.map(({ title, link }) => (
                      <li className="mb-2" key={section + title}>
                        <Link
                          to={link}
                          className={`${
                            typeof window !== "undefined" &&
                            window.location.pathname.includes(link)
                              ? "text-link font-semibold"
                              : "hover:text-link"
                          }`}
                        >
                          <p className="text-base font-semibold">{title}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SmoothCollapse>
    </>
  );
};

Header.propTypes = {
  newTheme: PropTypes.string,
};

const mapStateToProps = ({ newTheme }) => {
  return { newTheme };
};

const ConnectedHeader =
  typeof window !== `undefined`
    ? connect(mapStateToProps, null)(Header)
    : Header;

export default ConnectedHeader;

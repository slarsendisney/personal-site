import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import ThemePicker from "./themePicker";
import { useLocalStorage } from "../utils/customHooks";
import LogoAnimation from "./LogoAnimation";
import SmoothCollapse from "react-smooth-collapse";

const defaultTheme =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "theme-dark"
    : "theme-blue";

function Header() {
  const [theme, setTheme] = useLocalStorage("theme", defaultTheme);
  const [themeExpanded, setThemeExpanded] = useState(false);
  const [menuExpanded, toggleMenuExpansion] = useState(false);

  useEffect(() => {
    var currentCss = document.body.className;
    currentCss = currentCss.replace(/theme-\w*/g, "") + theme;
    document.body.className = currentCss;
  }, [theme]);

  return (
    <>
      <div className="bg-white">
        <SmoothCollapse expanded={themeExpanded} className="">
          <div className=" flex flex-wrap items-center justify-between container px-4 py-3 mx-auto mx-auto">
            <div className="flex items-center text-grey">
              <h3 className=" text-sm md:text-base">
                Choose a new <strong>Lick of Paint.</strong>
              </h3>
            </div>
            <ThemePicker theme={theme} setTheme={setTheme} />
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
                  elements: [
                    { title: "Articles", link: "/articles" },
                    { title: "Boilerplates", link: "/boilerplates" },
                    { title: "Uses", link: "/uses" },
                    { title: "Hackathons", link: "/sos" },
                  ],
                },
                {
                  section: "Extras",
                  elements: [
                    { title: "Site Stats", link: "/stats" },
                    { title: "Search", link: "/search" },
                    { title: "Newsletter", link: "/newsletter" },
                    { title: "Sponsor", link: "/sponsor" },
                  ],
                },
              ].map(({ section, elements }) => (
                <div className="px-8 my-4 w-auto " key={section}>
                  <div>
                    <h4 className="text-sm mb-3 font-semibold opacity-75">
                      {section.toUpperCase()}
                    </h4>
                  </div>
                  <ul className="grid grid-cols-2 lg:grid-cols-3">
                    {elements.map(({ title, link }) => (
                      <li className="mb-2" key={section + title}>
                        <Link to={link} className="hover:text-link ">
                          <p className="text-base">{title}</p>
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
}

export default Header;

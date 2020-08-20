import { Link } from "gatsby";
import React, { useState, useEffect } from "react";
import ThemePicker from "./themePicker";
import { useLocalStorage } from "../utils/customHooks";
import LogoAnimation from "./LogoAnimation";

function Header() {
  const [theme, setTheme] = useLocalStorage("theme", "theme-startup");
  const [isExpanded, toggleExpansion] = useState(false);

  useEffect(() => {
    var currentCss = document.body.className;
    currentCss = currentCss.replace(/theme-\w*/g, "") + theme;
    document.body.className = currentCss;
  }, [theme]);

  return (
    <>
      <div className="bg-white">
        <div className=" flex flex-wrap items-center justify-between max-w-4xl p-2 mx-auto md:p-8-lr">
          <div className="flex items-center text-secondary">
            <h1 className="text-3xl font-bold m-0">
              <i className="las la-paint-roller "></i>
            </h1>

            <h3 className="text-l">
              A New <strong>Lick of Paint.</strong>
            </h3>
          </div>
          <ThemePicker theme={theme} setTheme={setTheme} />
        </div>
      </div>
      <header className="bg-primary">
        <div className="flex flex-wrap items-center justify-between max-w-4xl p-4 mx-auto md:p-8">
          <Link to="/">
            <LogoAnimation />
          </Link>

          <button
            className="items-center block px-3 py-2 text-primary border border-white rounded md:hidden"
            onClick={() => toggleExpansion(!isExpanded)}
          >
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>

          <nav
            className={`${
              isExpanded ? `block` : `hidden`
            } md:block md:items-center w-full md:w-auto`}
          >
            {[
              {
                route: `/about`,
                title: `About`,
              },
              {
                route: `/newsletter`,
                title: `Newsletter`,
              },
            ].map((link) => (
              <Link
                className="block mt-4 text-primary no-underline md:inline-block md:mt-0 md:ml-6"
                key={link.title}
                to={link.route}
              >
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;

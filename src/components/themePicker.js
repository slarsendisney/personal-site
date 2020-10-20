import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
const lightThemes = new Set(["Blue", "Rhubarb and Custard"]);
const darkThemes = new Set(["Midnight Dreams", "Apocalypse"]);
const unlockables = new Set(["Fall Guys", "Matrix"]);
const themes = new Set([...darkThemes, ...lightThemes]);
const allThemes = [...lightThemes, ...darkThemes, ...unlockables];

const ThemePicker = ({ theme, setTheme, unlockedThemes, small }) => {
  const unlocked = new Set(unlockedThemes);
  const fontSize = small ? "text-sm" : "text-md";
  return (
    <div className="flex m-auto md:m-0">
      <ReactTooltip />
      {allThemes.map((item, index) => {
        const themeVal = item.toLowerCase().replace(/ /g, '');
        if (themes.has(item) || (unlockables.has(item) && unlocked.has(item))) {
          return (
            <div key={item} className={`theme-${themeVal}`}>
              <button
                aria-label={`Theme ${item}`}
                className={`h-10 w-8 my-1 ${
                  index !== allThemes.length ? "mr-4" : ""
                } transition duration-500  ease-in-out transform  ${
                  theme === `theme-${themeVal}` ? "" : "hover:scale-110"
                }`}
                onClick={() => setTheme(`theme-${themeVal}`)}
              >
                <div
                  data-tip={`${item}`}
                  className={`h-8 w-8 bg-primary  rounded-full my-2 md:my-0 flex items-center justify-center  ${
                    theme === `theme-${themeVal}`
                      ? " border-4 border-accent"
                      : ""
                  }`}
                >
                  {lightThemes.has(item) && (
                    <i
                      className={`text-white las la-sun text-primary opacity-75 ${
                        theme === `theme-${themeVal}` ? fontSize : "text-lg"
                      }`}
                    ></i>
                  )}
                  {darkThemes.has(item) && (
                    <i
                      className={`text-white las la-moon text-primary opacity-75 ${
                        theme === `theme-${themeVal}` ? fontSize : "text-lg"
                      }`}
                    ></i>
                  )}
                  {unlockables.has(item) && (
                    <i
                      className={`text-white las la-gift text-primary opacity-75 ${
                        theme === `theme-${themeVal}` ? fontSize : "text-lg"
                      }`}
                    ></i>
                  )}
                </div>
              </button>
            </div>
          );
        } else {
          return (
            <div className={``}>
              <button
                disabled={true}
                aria-label={`Theme Locked`}
                className={`h-10 w-8 my-1 ${
                  index !== allThemes.length ? "mr-4" : ""
                } transition duration-500  ease-in-out transform opacity-75`}
              >
                <div
                  data-tip={`Find this theme by exploring the site.`}
                  className={`h-8 w-8 bg-grey rounded-full my-2 md:my-0 flex items-center justify-center`}
                >
                  <i className="text-white text-xl las la-lock "></i>
                </div>
              </button>
            </div>
          );
        }
      })}
    </div>
  );
};

ThemePicker.propTypes = {
  theme: PropTypes.string,
  setTheme: PropTypes.func,
  unlockedThemes: PropTypes.arrayOf(PropTypes.string),
};

export default ThemePicker;

import React from "react";
import PropTypes from "prop-types";
import ReactTooltip from "react-tooltip";
import { useLocalStorage } from "../utils/customHooks";
const themes = new Set([
  "Pink",
  "Rhubarb and Custard",
  "Blue",
  "Midnight Dreams",
]);
const unlockables = new Set(["Fall Guys"]);

const allThemes = [...themes, ...unlockables];
const ThemePicker = ({ theme, setTheme }) => {
  const [unlockedThemes] = useLocalStorage("unlocked_themes", []);
  const unlocked = new Set(unlockedThemes);
  console.log(unlocked);
  return (
    <div className="flex m-auto md:m-0">
      <ReactTooltip />
      {allThemes.map((item, index) => {
        const themeVal = item.toLowerCase().replaceAll(" ", "");
        if (themes.has(item) || (unlockables.has(item) && unlocked.has(item))) {
          return (
            <div key={item} className={`theme-${themeVal}`}>
              <button
                aria-label={`Theme ${item}`}
                className={`h-8 w-8 ${
                  index !== allThemes.length ? "mr-4" : ""
                } transition duration-500  ease-in-out transform  ${
                  theme === `theme-${themeVal}` ? "" : "hover:scale-110"
                }`}
                onClick={() => setTheme(`theme-${themeVal}`)}
              >
                <div
                  data-tip={`${item}`}
                  className={`h-8 w-8 bg-primary rounded-full my-2 md:my-0 ${
                    theme === `theme-${themeVal}`
                      ? " border-4 border-accent"
                      : ""
                  }`}
                />
              </button>
            </div>
          );
        } else {
          return (
            <div className={``}>
              <button
                disabled={true}
                aria-label={`Theme Locked`}
                className={`h-8 w-8 ${
                  index !== allThemes.length ? "mr-4" : ""
                } transition duration-500  ease-in-out transform`}
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
};

export default ThemePicker;

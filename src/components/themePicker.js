import React from "react";
import PropTypes from "prop-types";

const themes = ["minimal", "startup", "blue"];

const ThemePicker = ({ theme, setTheme }) => {
  return (
    <div className="flex">
      {themes.map((item) => (
        <div key={item} className={`theme-${item}`}>
          <button
            aria-label={`Theme ${item}`}
            className={`h-8 w-8 mr-4 transition duration-500  ease-in-out transform  ${
              theme === `theme-${item}` ? "" : "hover:scale-110"
            }`}
            onClick={() => setTheme(`theme-${item}`)}
          >
            <div
              className={`h-8 w-8 bg-primary rounded-full ${
                theme === `theme-${item}` ? " border-4 border-secondary" : ""
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

ThemePicker.propTypes = {
  theme: PropTypes.string,
  setTheme: PropTypes.func,
};

export default ThemePicker;

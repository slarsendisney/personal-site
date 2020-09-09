const updateTheme = (newTheme) => {
  var currentCss = document.body.className;
  currentCss = currentCss.replace(/theme-\w*/g, "") + newTheme;
  document.body.className = currentCss;
  if (typeof window !== "undefined") {
    window.theme = newTheme;
  }
};

export default updateTheme;

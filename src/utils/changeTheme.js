const updateTheme = (newTheme) => {
  var currentCss = document.body.className;
  currentCss = currentCss.replace(/theme-\w*/g, "") + newTheme;
  document.body.className = currentCss;
  window.theme = newTheme;
};

export default updateTheme;

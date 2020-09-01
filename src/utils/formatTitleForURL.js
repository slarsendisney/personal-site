function formatTitleForURL(title) {
  return title
    .trim()
    .split(" ")
    .join("-")
    .split("'")
    .join("")
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      ""
    );
}

module.exports = { formatTitleForURL };

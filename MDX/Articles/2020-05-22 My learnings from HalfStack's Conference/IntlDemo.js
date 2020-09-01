import React from "react";

const Demo = () => {
  const numberFormatCompactNotation = (locale) => {
    return new Intl.NumberFormat(locale, {
      notation: "compact",
    });
  };
  const longNumber = 12500100;
  return (
    <div
      className="is-white-bg is-grey is-grey-border is-white pad-3  border-radius "
      style={{ width: "100%", height: "100%", border: "2px solid #444" }}
    >
      <div className="row" style={{ width: "100%" }}>
        <div className="col-xs-12">
          <h3 className="margin-1-tb">
            <strong>Original Number: {longNumber}</strong>
          </h3>
        </div>
        <div className="col-xs-12 col-sm-6">
          <p className="is-grey" style={{ margin: "auto" }}>
            <strong>English:</strong>{" "}
            {numberFormatCompactNotation("en").format(longNumber)}
          </p>
          <p className="is-grey" style={{ margin: "auto" }}>
            <strong>German:</strong>{" "}
            {numberFormatCompactNotation("de").format(longNumber)}
          </p>
          <p className="is-grey" style={{ margin: "auto" }}>
            <strong>Hindi:</strong>{" "}
            {numberFormatCompactNotation("hi").format(longNumber)}
          </p>
        </div>
        <div className="col-xs-12 col-sm-6">
          <p className="is-grey" style={{ margin: "auto" }}>
            <strong>Russian:</strong>{" "}
            {numberFormatCompactNotation("ru").format(longNumber)}
          </p>
          <p className="is-grey" style={{ margin: "auto" }}>
            <strong>Korean:</strong>{" "}
            {numberFormatCompactNotation("ko").format(longNumber)}
          </p>
          <p className="is-grey" style={{ margin: "auto" }}>
            <strong>Tamil:</strong>{" "}
            {numberFormatCompactNotation("ta").format(longNumber)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Demo;

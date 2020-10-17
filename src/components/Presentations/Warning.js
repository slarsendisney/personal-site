import React from "react";
import WarningAnimation from "../Animations/WarningAnimation";

export default ({ content, backgroundColourClassName }) => {
  return (
    <div className=" is-yellow-bg is-grey pres-warning flex align-horizontal align-vertical py-8 px-16 rounded">
      <WarningAnimation backgroundColourClassName={backgroundColourClassName} />
      <p className="margin-0">{content}</p>
    </div>
  );
};

import React from "react";
import SuccessAnimation from "../Animations/SuccessAnimation";

export default ({ content, backgroundColourClassName }) => {
  return (
    <div className="is-project-tag-bg pres-warning flex items-center text-center py-8 px-12 rounded">
      <SuccessAnimation backgroundColourClassName={backgroundColourClassName} />
      <p className="margin-0 is-white-always">{content}</p>
    </div>
  );
};

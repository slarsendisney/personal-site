import React from "react";
import ReactMarkdown from "react-markdown";

export default ({ center, children }) => {
  return (
    <div
      className={` w-full max-w-3xl ${
        center ? "text-center" : ""
      }`}
    >
      <ReactMarkdown children={children} />
    </div>
  );
};
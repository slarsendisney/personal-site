import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default (props, { language = "jsx" }) => {
  return (
    <div
      className="is-white-always flex"
      style={{ width: "100%", minWidth: "80vw" }}
    >
      <SyntaxHighlighter
        style={atomOneDark}
        language={language}
        wrapLines
        customStyle={{
          padding: 10,
          paddingTop: 15,
          paddingBottom: 15,
          borderRadius: 5,
          margin: 0,
          width: "100%",
        }}
        codeTagProps={{ className: "is-white-always" }}
        showLineNumbers
        lineNumberContainerProps={{
          style: {
            opacity: 0.5,
            float: "left",
            paddingRight: "15px",
            paddingLeft: "10px",
          },
          className: "is-white-always",
        }}
        {...props}
      />
    </div>
  );
};

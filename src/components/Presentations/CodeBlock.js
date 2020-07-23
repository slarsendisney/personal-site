import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

export default (props) => {
  return (
    <div
      className="is-white-always flex"
      style={{ maxWidth: "100%", width: "100vw" }}
    >
      <SyntaxHighlighter
        style={atomOneDark}
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
  )
}

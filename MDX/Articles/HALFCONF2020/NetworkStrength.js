import React from "react"

export default () => {
  return (
    <div
      className="flex is-white-bg is-grey-border is-white pad-3  border-radius align-horizontal align-vertical"
      style={{ width: "100%", height: "100%", border: "2px solid #444" }}
    >
      <h2 className="is-grey" style={{ margin: "auto" }}>
        Your effective network type:{" "}
        {typeof navigator !== "undefined"
          ? navigator.connection.effectiveType.toUpperCase()
          : ""}
      </h2>
    </div>
  )
}

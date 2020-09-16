import React, { useState } from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"

export default ({
  fullWidth,
  noErrors,
  large,
  previewClassNames,
  code = `
  // This code is editable. Give it a try!
  () => (
    <p>
      A paragraph component 🚀!
    </p>
  )`,
}) => {
  return (
    <LiveProvider code={code}>
      <div
        className={`row pad-2-t ${large ? "" : "legal"} ${
          fullWidth ? "pad-5" : ""
        }`}
        style={{
          width: fullWidth ? "100vw" : "auto",
        }}
      >
        <div className="col-xs-12 col-md-6 margin-5-b">
          <div className="is-grey-bg-always is-white-always pad-5 border-radius">
            <LiveEditor />
            {!noErrors && (
              <LiveError
                className={`is-red-bg pad-3 border-radius ${
                  large ? "" : "legal"
                }`}
                style={{
                  wordWrap: "break-word",
                  overflowX: "auto",
                }}
                style={{ fontSize: 12 }}
              />
            )}
          </div>
        </div>
        <div className="col-xs-12 col-md-6 margin-5-b">
          <div
            className={
              previewClassNames + " is-light-grey-bg pad-5 border-radius"
            }
            style={{ height: "100%" }}
          >
            <LivePreview />
          </div>
        </div>
      </div>
    </LiveProvider>
  )
}

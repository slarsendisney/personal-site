import React, { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export default ({
  fullWidth,
  noErrors,
  large,
  previewClassNames,
  codeOnly,
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
        className={`sm: -mx-2 md:-mx-16 lg:-mx-24 grid ${
          fullWidth || codeOnly ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 "
        } gap-4 mb-4`}
      >
        <div className="editor text-sm mx-1">
          <div
            className="bg-gray-700 rounded p-2"
            style={{ caretColor: "white" }}
          >
            <LiveEditor />
            {(!noErrors && !codeOnly) && <LiveError className={``} />}
          </div>
        </div>
        {!codeOnly && (
          <div className="mx-1">
            <div className="bg-secondary h-full rounded p-2 md:p-5 w-full max-w-6xl">
              <LivePreview className="prose max-w-6xl text-secondary w-full" />
            </div>
          </div>
        )}
      </div>
    </LiveProvider>
  );
};

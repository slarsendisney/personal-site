import React, { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

export default ({
  fullWidth,
  noErrors,
  large,
  previewClassNames,
  noPadBottom,
  noPadTop,
  codeOnly,
  title,
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
        className={`code-block sm:-mx-2 md:-mx-16 lg:-mx-24 grid ${
          fullWidth || codeOnly ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 "
        } gap-4 ${!noPadTop ? `pt-12` : ""} ${
          !noPadBottom ? "pb-16" : ""
        } sm:mb-4`}
      >
        {title && (
          <div className={`${!codeOnly && `md:col-span-2`}`}>
            <p className="text-xs" style={{marginBottom:"1px !important"}}>{title}</p>
          </div>
        )}
        <div className="editor text-sm mx-1">
          <div
            className="bg-gray-700 rounded p-2"
            style={{ caretColor: "white" }}
          >
            <LiveEditor />
            {!noErrors && !codeOnly && <LiveError className={``} />}
          </div>
        </div>
        {!codeOnly && (
          <div className="mx-1">
            <div className="bg-logo-three h-full rounded p-2 md:p-5 w-full max-w-6xl">
              <LivePreview className="prose max-w-6xl text-accent w-full" />
            </div>
          </div>
        )}
      </div>
    </LiveProvider>
  );
};

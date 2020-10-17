import React, { useState } from "react";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";

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
      <div className={`grid grid-cols-2 gap-4 mb-4`}>
        <div className="unset-all mx-1">
          <div className="bg-white rounded p-2">
            <LiveEditor className="text-2xl" />
            {!noErrors && <LiveError className={``} />}
          </div>
        </div>
        <div className="mx-1">
          <div className="bg-secondary h-full rounded p-2">
            <LivePreview className="article" />
          </div>
        </div>
      </div>
    </LiveProvider>
  );
};

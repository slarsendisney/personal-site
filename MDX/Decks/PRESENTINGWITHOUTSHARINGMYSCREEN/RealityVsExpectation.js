import React, { useState } from "react";
import { Pixelify } from "react-pixelify";

export default () => {
  const [reality, setReality] = useState(false);

  return (
    <div className="row">
      <div className="col-xs-12" style={{ minHeight: "50%" }}>
        {reality ? (
          <div style={{ width: "80%" }}>
            <Pixelify
              src="https://ik.imagekit.io/sld/Screenshot_2020-08-07_at_15.25.59_S_VrLUzsTo0.png?tr=w-600,h-360"
              pixelSize={5}
            />
          </div>
        ) : (
          <img src="https://ik.imagekit.io/sld/Screenshot_2020-08-07_at_15.25.59_S_VrLUzsTo0.png?tr=w-600,h-360" />
        )}
      </div>
      <div className="flex justify-center items-center my-10">
        <button
          className="btn text-2xl"
          onClick={() => {
            setReality(!reality);
            if (typeof document !== "undefined") {
              document.getElementById("gatsby-focus-wrapper").focus();
            }
          }}
          style={{ minWidth: 270 }}
        >
          <h6 className="margin-0">
            Click here for the {reality ? "expectation" : "reality"}
          </h6>
        </button>
      </div>
    </div>
  );
};

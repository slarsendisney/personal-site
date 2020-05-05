import React from "react";

export default ({ title, desc, good, bad }) => (
  <div
    className=" pad-10 is-grey-bg"
    style={{ width: "100vw", height: "100vh", overflowY: "auto" }}
  >
    <div className="is-white-bg pad-5" style={{ borderRadius: 10 }}>
      <h3 className="margin-0">{title}</h3>
      <h5
        className="margin-0 margin-5-t margin-3-b"
        dangerouslySetInnerHTML={{ __html: desc }}
      />
    </div>
    <div className="row margin-5-t">
      <div className="col-xs-6 is-white pad-2">
        <h5 className="margin-0">👎</h5>
      </div>
      <div className="col-xs-6 is-white pad-2">
        <h5 className="margin-0">👍</h5>
      </div>
      <div
        className="col-xs-6 is-red-bg pad-10 min-card-height"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {bad}
      </div>
      <div
        className="col-xs-6 is-green-bg pad-10 min-card-height"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        {good}
      </div>
    </div>
  </div>
);

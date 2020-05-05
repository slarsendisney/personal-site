import React from "react";
import GoodBadExample from "./GoodBadExample";

const Good = () => (
  <div className="is-white-bg pad-10">
    <h5 className="margin-0 margin-1-b margin-5-t">Terms and Conditions</h5>
    <p style={{ fontSize: 15 }}>
      Do you accept the terms and conditons as outlined above?
    </p>
    <div
      className="margin-5-t"
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      <button className="btn-sm is-red-bg is-white">CANCEL</button>
      <button className="btn-sm is-green-bg is-white">ACCEPT</button>
    </div>
  </div>
);

const Bad = () => (
  <div className="is-white-bg pad-10">
    <h5 className="margin-0 margin-1-b margin-5-t">Terms and Conditions</h5>
    <p style={{ fontSize: 15 }}>
      Do you accept the terms and conditons as outlined above?
    </p>
    <div
      className="margin-5-t"
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      <button className="btn-sm is-red-bg is-white">ACCEPT</button>
      <button className="btn-sm is-green-bg is-white">CANCEL</button>
    </div>
  </div>
);

export default () => (
  <GoodBadExample
    title="Green means go"
    desc={`Make sure that your use of colour directs the user. If you love this, check out: <a class="is-pink" href="https://userinyerface.com/" target="_blank">User Inyerface</a>`}
    good={<Good />}
    bad={<Bad />}
  />
);

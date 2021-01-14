import React, { useState } from "react";
import PropTypes from "prop-types";
import { trackCustomEvent } from "gatsby-plugin-google-analytics";
import urls from "../data/urls.json";

const Newsletter = ({ nodesc }) => {
  const [email, setEmail] = useState("");
  const [sumitted, setSubmitted] = useState("");

  const handleSubmit = () => {
    fetch(`${urls.api}/subscribe`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email }),
    }).then(() => {
      const subLocation =
        typeof window !== "undefined" ? window.location.pathname : "N/A";
      trackCustomEvent({
        category: "Subscribe",
        action: "Click",
        label: `Subscribe Click - ${subLocation}`,
      });
      setSubmitted(true);
    });
  };

  return (
    <div className="px-4 pt-3 pb-4  -mx-4 mb-16 sm:mb-0">
      <h2 className="text-2xl lg:text-3xl text-left inline-block font-semibold">
        Join My Newsletter
      </h2>
      {!nodesc && (
        <p className="text-md pl-px">
          Want to know when I post something new? For the latest articles and
          projects straight to your inbox, subscribe to my newsletter.
        </p>
      )}
      {!sumitted ? (
        <form
          action="#"
          className="mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="grid grid-cols-10 h-12 gap-4">
            <input
              id="email"
              aria-label="email"
              type="email"
              placeholder="you@email.com"
              className="input col-span-10 sm:col-span-8 h-12"
              required
              style={{ marginTop: 0 }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="col-span-10 sm:col-span-2 text-center">
              <button className="w-full btn-accent" style={{ maxWidth: 1000 }}>
                Sign Up
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center bg-accent text-primary my-2 py-2 rounded">
          <h2 className="mb-1 text-2xl font-bold">
            Awesome, you're all signed up!{" "}
          </h2>
          <p className="m-0 text-base">
            Thanks for showing interest in my content.
          </p>
        </div>
      )}
    </div>
  );
};

Newsletter.propTypes = {
  nodesc: PropTypes.bool,
};
export default Newsletter;

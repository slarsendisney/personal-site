import React from "react";
import PropTypes from "prop-types";

const Newsletter = ({ nodesc }) => (
  <div className="px-4 pt-3 pb-4  -mx-4 ">
    <h2 className="text-1xl md:text-2xl lg:text-3xl text-left inline-block font-semibold">
      Join My Newsletter
    </h2>
    {!nodesc && (
      <p className="text-md pl-px">
        Want to know when I post something new? For the latest articles and
        projects straight to your inbox, subscribe to my newsletter.
      </p>
    )}
    <form action="#" className="mt-2">
      <div className="">
        <input
          id="email"
          aria-label="email"
          type="email"
          placeholder="you@email.com"
          className="input"
          required
        />
        <button
          className="bg-primary hover:bg-primary-light text-primary  duration-500 ease-in-out transform  px-5 py-2 rounded shadow "
          style={{ marginLeft: "-7.8rem" }}
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
);

Newsletter.propTypes = {
  nodesc: PropTypes.bool,
};
export default Newsletter;

import React from "react";
import PropTypes from "prop-types";

const Newsletter = ({ nodesc }) => (
  <div className="px-4 pt-3 pb-4  -mx-4 mb-16 sm:mb-0">
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
      <div className="grid grid-cols-10 items-center h-12">
        <input
          id="email"
          aria-label="email"
          type="email"
          placeholder="you@email.com"
          className="input col-span-10 sm:col-span-8 h-12"
          required
        />
        <div className="col-span-10 sm:col-span-2 items-center text-center  sm:p-1 pt-3 sm:pt-3">
          <button className="w-full btn-accent ">Sign Up</button>
        </div>
      </div>
    </form>
  </div>
);

Newsletter.propTypes = {
  nodesc: PropTypes.bool,
};
export default Newsletter;

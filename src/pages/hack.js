import React, { useState } from "react";
// import PropTypes from "prop-types";
import Layout from "../components/layout";
import SEO from "../components/seo";

const roles = ["Designer", "Developer", "Bit of Both"];

const Start = () => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(-1);

  const showDetail = () => {
    switch (type) {
      case 0:
        return (
          <section className="text-secondary bg-secondary">
            <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
              <h1 className="text-2xl md:text-5xl font-bold mb-2">
                <i className="las la-pencil-ruler"></i> I&apos;m a Designer.
              </h1>
            </div>
          </section>
        );
      case 1:
        return (
          <section className="text-secondary bg-secondary">
            <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
              <h1 className="text-2xl md:text-5xl font-bold mb-2">
                <i className="las la-laptop-code"></i> I&apos;m a Developer.
              </h1>
            </div>
          </section>
        );
      case 2:
        return (
          <section className="text-secondary bg-secondary">
            <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
              <h1 className="text-2xl md:text-5xl font-bold mb-2">
                <i className="las la-gem"></i> I&apos;m both.
              </h1>
            </div>
          </section>
        );
    }
  };
  return (
    <Layout>
      <SEO title="Hack" socialcard={"social-card-hack"} />
      <div className=" bg-default">
        <section className="text-secondary bg-default  ">
          <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
            <h1 className="text-2xl md:text-6xl font-bold leading-none mb-2">
              <i className="las la-skull"></i> Sam&apos;s Hackathon Survival
              Guide
            </h1>
            <p className="mb-3 text-base md:text-2xl">
              A creative cheat sheet to help you get off to a running start at
              your next (or first!) hack. I put this together as my way of
              giving back. I hope that it might help you get hacking smarter and
              faster.
            </p>
            <div className="relative inline-block text-left">
              <div className="flex w-full items-center">
                <h4 className="text-xl md:text-4xl font-semibold flex items-center">
                  Tell me what you are! I am a...
                  <span className="rounded-md shadow-sm ml-2">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border-4 border-accent px-4 py-2 bg-primary text-primary text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      onClick={() => setOpen(!open)}
                    >
                      <h4 className="text-base md:text-2xl">
                        {type !== -1 ? (
                          <span>{roles[type]}</span>
                        ) : (
                          <span>
                            Please Choose{" "}
                            <i className="las la-arrow-circle-down"></i>
                          </span>
                        )}
                      </h4>
                    </button>
                  </span>
                </h4>
              </div>
              {open && (
                <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg">
                  <div className="rounded-md bg-primary border-4 border-accent text-primary shadow-xs">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {roles.map((type, index) => (
                        <button
                          key={type}
                          href="#"
                          className="block px-4 py-2 text-xl md:text-2xl w-full text-left hover:bg-primary-light leading-5 "
                          role="menuitem"
                          onClick={() => {
                            setType(index);
                            setOpen(!open);
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
        <div
          className={`transition-opacity duration-150 ease-in-out ${
            type !== -1 ? "opacity-100" : "opacity-0"
          }`}
        >
          {type !== -1 && showDetail()}
        </div>
      </div>
    </Layout>
  );
};

// Start.propTypes = {};

export default Start;

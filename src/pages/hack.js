import React, { useState } from "react";
import * as Scroll from "react-scroll";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/layout";
import SEO from "../components/seo";

var Element = Scroll.Element;
var scroller = Scroll.scroller;

const roles = ["UX Designer"]; //, "Front-End Developer", "Back-End Developer"];

const Start = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(-1);

  const showDetail = () => {
    switch (type) {
      case 0:
        return (
          <section className="text-secondary bg-secondary">
            <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
              <Element name="guide">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  <i className="las la-pencil-ruler"></i> I&apos;m a UX
                  Designer.
                </h1>
              </Element>
              <div className="guide article">
                <MDXProvider>
                  <MDXRenderer>{data.designer.body}</MDXRenderer>
                </MDXProvider>
              </div>
            </div>
          </section>
        );
      case 1:
        return (
          <section className="text-secondary bg-secondary">
            <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
              <Element name="guide">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  <i className="las la-laptop-code"></i> I&apos;m a Developer.
                </h1>
              </Element>
            </div>
          </section>
        );
      case 2:
        return (
          <section className="text-secondary bg-secondary">
            <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
              <Element name="guide">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                  <i className="las la-gem"></i> I&apos;m both.
                </h1>
              </Element>
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
                          <span>
                            {roles[type]}{" "}
                            <i className="las la-arrow-circle-down"></i>
                          </span>
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
                <div
                  className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg"
                  style={{ zIndex: 1000 }}
                >
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
                            setTimeout(
                              () =>
                                scroller.scrollTo("guide", {
                                  duration: 1000,
                                  smooth: true,
                                }),
                              100
                            );
                          }}
                        >
                          {type}
                        </button>
                      ))}
                      <div
                        className="block px-4 py-2 border-t-2 mt-1 text-sm md:text-base w-full text-left leading-5"
                        role="menuitem"
                        style={{ borderTopColor: "#ffffff30" }}
                      >
                        <span className="opacity-75">More coming soon!</span>
                      </div>
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
        {type !== -1 && (
          <section className="text-secondary bg-default  ">
            <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
              <h4 className="text-2xl md:text-4xl">
                Got something that should be on this page?
              </h4>
              <p className="text-2xl md:text-4xl">
                Let me know at{" "}
                <a
                  href="mailto:sam@sld.codes"
                  className="link"
                  target="_blank"
                  rel="noreferrer"
                >
                  sam@sld.codes
                </a>
                !
              </p>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

// Start.propTypes = {};

export const query = graphql`
  {
    designer: mdx(frontmatter: { type: { eq: "hack/designer" } }) {
      id
      body
    }
  }
`;

export default Start;

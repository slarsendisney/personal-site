import React from "react";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Start = ({ location }) => {
  return (
    <Layout>
      <SEO title="Boilerplates" location={location} />
      <div className=" bg-default">
        <section className="text-secondary bg-default  ">
          <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
            <h1 className="text-4xl font-bold">
              Sams Hackathon Survival Guide V2
            </h1>
            <p className="mb-3">
              In computer programming, boilerplate code or just boilerplate are
              sections of code that have to be included in many places with
              little or no alteration. When using languages that are considered
              verbose, the programmer must write a lot of code to accomplish
              only minor functionality. Such code is called boilerplate.
            </p>
          </div>
        </section>
        <section className="text-secondary bg-secondary  ">
          <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
            <h1 className="text-3xl font-bold mb-2">I&apos;m a Designer.</h1>
          </div>
        </section>
        <section className="text-secondary bg-default  ">
          <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
            <h1 className="text-3xl font-bold mb-2">I&apos;m a Developer.</h1>
          </div>
        </section>
      </div>
    </Layout>
  );
};

Start.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default Start;

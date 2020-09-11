import React from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { Emojione } from "react-emoji-render";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Layout from "../components/layout";
import SEO from "../components/seo";

const BoilerPlate = ({ title, desc, flag, repo, demo }) => (
  <div className="p-3 bg-default rounded mb-3 md:mb-2 xl:mb-0">
    <div
      className="pad-2 pad-3-lr is-white-bg border-radius "
      style={{ height: "100%" }}
    >
      <h1 className="text-2xl">
        <Emojione text={title} className="flex flex-wrap items-center" />
      </h1>
      <h4 className="mb-2">
        {desc}{" "}
        {demo && (
          <span>
            <OutboundLink
              className="link"
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              See the demo!
            </OutboundLink>
          </span>
        )}
      </h4>

      <h4>Get set up by typing the following command in your terminal:</h4>
      <div className="p-3 rounded bg-secondary my-1">
        <code className=" text-secondary text-sm">
          {`npx -p yo -p generator-sld -- yo sld:${flag}`}
        </code>
      </div>

      <h4>
        Or check out the{" "}
        <OutboundLink
          className="link"
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
        >
          git repo
        </OutboundLink>
      </h4>
    </div>
  </div>
);

BoilerPlate.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  flag: PropTypes.string,
  repo: PropTypes.string,
  demo: PropTypes.string,
};

const Start = ({ data, location }) => {
  const boilerplates = data.allMdx.edges;
  return (
    <Layout>
      <SEO title="Boilerplates" location={location} />
      <div className=" bg-default">
        <section className="text-secondary bg-default  ">
          <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
            <h1 className="text-4xl  font-bold">Boilerplates</h1>
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
            <h1 className="text-2xl font-semibold mb-2">Gatsby Boilerplates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              {boilerplates.map((item) => (
                <BoilerPlate
                  key={item.node.frontmatter.title}
                  {...item.node.frontmatter}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="text-secondary bg-default  ">
          <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
            <h1 className="text-3xl font-bold text-center opacity-75">
              More coming soon!
            </h1>
          </div>
        </section>
      </div>
    </Layout>
  );
};

Start.propTypes = {
  location: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            body: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired
      ),
    }).isRequired,
  }),
};

export default Start;

export const query = graphql`
  {
    allMdx(
      filter: { frontmatter: { type: { eq: "Boilerplate" } } }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            title
            desc
            demo
            flag
            repo
          }
        }
      }
    }
  }
`;

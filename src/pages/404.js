import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import StringSimilarity from "string-similarity";
import Layout from "../components/layout";
import SEO from "../components/seo";

const fourOFour = ({ location, data }) => {
  const pages = data.allSitePage.nodes.map(({ path }) => path);
  const pathname = location.pathname;
  const result = StringSimilarity.findBestMatch(pathname, pages).bestMatch;
  function renderContent() {
    return result.rating > 0.7 ? (
      <>
        <h1 className="text-4xl  mb-5">
          <span className="opacity-50">You were probably looking for</span>{" "}
          <Link to={result.target} className="text-link font-semibold">
            {result.target}
          </Link>
        </h1>
        <h3 className="text-xl">
          <span className="font-semibold">Not what you&apos;re after?</span>{" "}
          Click your heels together three times and say &apos;There&apos;s no
          place like home&apos;, press the button below, and you&apos;ll be
          there.
        </h3>
      </>
    ) : (
      <>
        <h1 className="text-4xl opacity-50 mb-5">Yep, you&apos;re lost.</h1>
        <h3 className="">
          Click your heels together three times and say &apos;There&apos;s no
          place like home&apos;, press the button below, and you&apos;ll be
          there.
        </h3>
      </>
    );
  }

  return (
    <Layout>
      <SEO title={"404"} />
      <section className="text-secondary bg-default  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="text-4xl">Page not found.</h1>
          {renderContent()}
          <Link
            to={"/"}
            style={{ textDecoration: "none" }}
            className=" align-horizontal is-white lato margin-4-r"
          >
            <button className="btn my-5">
              There&apos;s no place like home
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

fourOFour.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export const pageQuery = graphql`
  {
    Hero: file(relativePath: { eq: "404Hero.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    allSitePage(
      filter: { path: { nin: ["/dev-404-page", "/404", "/404/", "/404.html"] } }
    ) {
      nodes {
        path
      }
    }
  }
`;

export default fourOFour;

import React from "react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import SEO from "../components/seo";
const Bio = ({ data }) => {
  return (
    <Layout>
      <SEO title={"Uses"} socialcard="social-card-uses" />
      <section className="text-secondary bg-default  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 article">
          <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
        </div>
      </section>
    </Layout>
  );
};

Bio.propTypes = {
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

export default Bio;

export const query = graphql`
  {
    allMdx(filter: { frontmatter: { type: { eq: "USES" } } }, limit: 1) {
      edges {
        node {
          body
        }
      }
    }
  }
`;

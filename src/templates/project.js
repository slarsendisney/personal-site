import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import Img from "gatsby-image";
import SEO from "../components/seo";

const Project = ({ data }) => {
  const { mdx } = data; // data.markdownRemark holds our post data
  const { frontmatter, body, fields } = mdx;
  return (
    <Layout>
      <SEO title={frontmatter.title} socialcard={fields.socialcard} />
      <Img
        fluid={frontmatter.coverimg.childImageSharp.fluid}
        className="w-full h-full"
        style={{
          maxHeight: 400,
        }}
        objectPosition="50% 50%"
      />

      <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
        <h1 className="text-4xl font-semibold text-center">
          {frontmatter.title}
        </h1>
        <p className="text-3xl text-center mb-5 is-grey text-align-center">
          {frontmatter.desc}
        </p>

        <div className={`article`}>
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      fields {
        socialcard
      }
      frontmatter {
        title
        desc
        coverimg {
          childImageSharp {
            fluid(maxWidth: 1200) {
              # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`;

Project.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.shape({
      fields: PropTypes.shape({
        socialcard: PropTypes.string.isRequired,
      }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        coverimg: PropTypes.shape({
          childImageSharp: PropTypes.shape({
            fluid: PropTypes.string.isRequired,
          }).isRequired,
        }).isRequired,
      }),
      body: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default Project;

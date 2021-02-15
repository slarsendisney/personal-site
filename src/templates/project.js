import React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import { GatsbyImage } from "gatsby-plugin-image";
import SEO from "../components/seo";
import replaceAll from "replaceall";

const Project = ({ data }) => {
  const { mdx } = data; // data.markdownRemark holds our post data
  const { frontmatter, body, fields } = mdx;
  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        socialcard={fields.socialcard}
        video={`${replaceAll("/", "-", frontmatter.path.slice(1))}.mp4`}
      />
      <GatsbyImage
        image={frontmatter.coverimg.childImageSharp.gatsbyImageData}
        className="w-full h-full md:max-w-4xl mx-auto md:mt-5 md:rounded"
        style={{
          maxHeight: 400,
        }}
        objectPosition="50% 50%"
      />

      <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 prose text-secondary">
        <h1 className="text-center">{frontmatter.title}</h1>
        <p className="text-center">{frontmatter.desc}</p>

        <div className={``}>
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
        path
        desc
        coverimg {
          childImageSharp {
            gatsbyImageData(maxWidth: 1200, placeholder: NONE, layout: FLUID)
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

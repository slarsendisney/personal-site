import React from "react";
import { Link, graphql } from "gatsby";
import parse from "date-fns/parse";
import compareAsc from "date-fns/compareAsc";
import Layout from "../components/layout";
import PropTypes from "prop-types";
import Img from "gatsby-image";

export const Card = ({
  title,
  desc,
  tags,
  path,
  excerpt,
  coverimg,
  bg,
  text,
}) => (
  <Link to={path} key={path} className=" h-full">
    <div className="card w-full cursor-pointer h-full mb-4 duration-500 ease-in-out transform hover:scale-105">
      <div
        className={`${bg ? bg : "bg-default"} ${
          text ? text : "text-default"
        } shadow-lg h-full rounded-lg rounded `}
      >
        <div className="block">
          <figure className="relative tint mb-5 h-48 w-full">
            <Img
              fluid={coverimg.childImageSharp.fluid}
              className="rounded-t h-full"
            />
          </figure>
        </div>
        <div className="p-5 pb-16">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className={`text-base ${text ? text : "text-default"}`}>
            {desc ? desc : excerpt}
          </p>
          <div className="absolute bottom-0">
            <div className="flex flex-wrap mb-5">
              {tags.slice(0, 3).map((tag) => (
                <button key={tag} className="tag">
                  {tag.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  coverimg: PropTypes.shape({
    childImageSharp: PropTypes.shape({ fluid: PropTypes.string.isRequired }),
  }),
};

const Projects = ({ data }) => {
  let { edges } = data.allMdx; // data.markdownRemark holds our post data

  return (
    <Layout>
      <section className="text-secondary bg-default">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h3 className="text-4xl  font-semibold">Projects</h3>
          <p className="text-base mb-3">
            Here you&apos;ll find lots of my side projects, many have links so I
            encourage you to check them out and have a go.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {edges
              .sort((a, b) => {
                var resultA = parse(
                  a.node.frontmatter.date,
                  "yyyy-MM-dd",
                  new Date()
                );
                var resultB = parse(
                  b.node.frontmatter.date,
                  "yyyy-MM-dd",
                  new Date()
                );
                return compareAsc(resultB, resultA);
              })
              .map((item) => (
                <Card
                  bg="bg-white"
                  text="text-black"
                  {...item.node.frontmatter}
                  key={item.node.frontmatter.title}
                />
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

Projects.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export const pageQuery = graphql`
  query Projects {
    allMdx(filter: { frontmatter: { type: { eq: "Project" } } }) {
      edges {
        node {
          id
          frontmatter {
            type
            title
            desc
            tags
            date
            path
            coverimg {
              childImageSharp {
                fluid(maxWidth: 400) {
                  # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default Projects;

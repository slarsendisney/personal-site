import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { CardText } from "../templates/articles";
import { Card } from "../templates/projects";

const Search = ({ data }) => {
  console.log(data);
  return (
    <Layout>
      <section className="text-default bg-default">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-12 ">
          <h1 className="text-base md:text-lg lg:text-xl text-left">
            <i className="las la-search md:mr-1"></i>SITE SEARCH
          </h1>
          <input
            className="input"
            placeholder="Articles, Projects and More!"
          ></input>
        </div>
      </section>
      <section className="text-default bg-secondary">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 ">
          <h1 className="text-base md:text-lg lg:text-xl text-left mb-5">
            <i className="las la-lightbulb md:mr-1"></i>RECOMMENDED
          </h1>
          <div className="grid md:grid-rows-5 grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="md:row-span-3">
              <Card
                {...data.ShowCaseProject.nodes[0].frontmatter}
                {...data.ShowCaseProject.nodes[0]}
              />
            </div>
            <div className="md:row-span-2">
              <CardText
                hideTags={true}
                {...data.ShowCaseTwo.nodes[0].fields}
                {...data.ShowCaseTwo.nodes[0].frontmatter}
              />
            </div>
            <div className="md:row-span-3">
              <Card
                {...data.ShowCaseProjectTwo.nodes[0].frontmatter}
                {...data.ShowCaseProjectTwo.nodes[0]}
              />
            </div>
            <div className="md:row-span-2">
              <CardText
                hideTags={true}
                {...data.ShowCaseOne.nodes[0].fields}
                {...data.ShowCaseOne.nodes[0].frontmatter}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-secondary bg-default">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-32 ">
          <h1 className="text-center text-lg md:text-4xl font-semibold text-default">
            “The seekers are those that don’t fit.”
          </h1>
          <h1 className="text-center text-base md:text-xl font-semibold opacity-75">
            Shannon L. Alder
          </h1>
        </div>
      </section>
    </Layout>
  );
};

Search.propTypes = {
  data: PropTypes.shape({
    ShowCaseTwo: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({}),
          fields: PropTypes.shape({}),
        })
      ),
    }),
    ShowCaseOne: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({}),
          fields: PropTypes.shape({}),
        })
      ),
    }),
    ShowCaseProject: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({}),
        })
      ),
    }),
    ShowCaseProjectTwo: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          frontmatter: PropTypes.shape({}),
        })
      ),
    }),
  }).isRequired,
};

export const query = graphql`
  {
    ShowCaseOne: allMdx(
      limit: 1
      filter: { frontmatter: { type: { eq: "Article" } } }
      skip: 3
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          desc
          tags
        }
        fields {
          slug
        }
        excerpt
      }
    }
    ShowCaseTwo: allMdx(
      limit: 1
      filter: { frontmatter: { type: { eq: "Article" } } }
      skip: 6
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          desc
          tags
        }
        fields {
          slug
        }
        excerpt
      }
    }
    ShowCaseProject: allMdx(
      limit: 1
      filter: { frontmatter: { type: { eq: "Project" } } }
      skip: 4
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          type
          title
          date
          desc
          tags
          path
          coverimg {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
        excerpt
      }
    }
    ShowCaseProjectTwo: allMdx(
      limit: 1
      filter: { frontmatter: { type: { eq: "Project" } } }
      skip: 2
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          type
          title
          date
          desc
          tags
          path
          coverimg {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
        }
        excerpt
      }
    }
  }
`;

export default Search;

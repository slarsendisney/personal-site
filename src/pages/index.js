import React from "react";
import { Link, graphql } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Newsletter from "../components/Newsletter";
import Hero from "../components/Hero";
import PreferPaper from "../components/PreferPaper";
import { CardText } from "../templates/articles";
import { Card } from "../templates/projects";

function IndexPage({ data }) {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
        socialcard={"social-card-home"}
      />

      <Hero />
      <section className="text-secondary bg-secondary  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="inline-block -mx-3 p-3 mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">
            Latest Posts
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {data.Articles.edges.map((article) => (
              <CardText
                key={article.node.fields.slug}
                slug={article.node.fields.slug}
                {...article.node}
                {...article.node.frontmatter}
              />
            ))}
          </div>
          <div className="text-right">
            <Link to="/articles" className="link">
              <h3 className="">
                ALL ARTICLES <i className="las la-arrow-right"></i>
              </h3>
            </Link>
          </div>
        </div>
      </section>
      <section className="text-secondary bg-compliment  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="inline-block -mx-3 p-3 mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">
            Recent Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            {data.Projects.edges.map((project) => (
              <Card
                {...project.node.frontmatter}
                key={project.node.frontmatter.path}
              />
            ))}
          </div>
          <div className="text-right">
            <Link to="/projects" className="link">
              <h3 className="">
                ALL PROJECTS <i className="las la-arrow-right"></i>
              </h3>
            </Link>
          </div>
        </div>
      </section>
      <section className="text-center text-secondary bg-default relative">
        <Img
          fluid={data.eventHero.childImageSharp.fluid}
          className="w-full h-full opacity-75"
          style={{
            zIndex: 10,
            position: "absolute",
          }}
          objectPosition="75% 50%"
        />
        <div
          className="relative w-full max-w-4xl px-4 py-32 mx-auto md:px-8 md:py-40"
          style={{
            zIndex: 500,
          }}
        >
          <h1 className="mb-4 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Conferences and Hackathons
          </h1>
          <Link to="/events">
            <button className="btn max-w-md w-8/12 py-3 px-5">
              Upcoming Events
            </button>
          </Link>
        </div>
      </section>
      <section className="text-secondary bg-secondary  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <Newsletter />
        </div>
      </section>
      <PreferPaper mug={data.mug} paperclip={data.paperclip} />
    </Layout>
  );
}
IndexPage.propTypes = {
  data: PropTypes.shape({
    Articles: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    Projects: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    eventHero: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    paperclip: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    mug: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    Articles: allMdx(
      filter: { frontmatter: { type: { eq: "Article" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: 4
    ) {
      edges {
        node {
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
    }
    Projects: allMdx(
      filter: { frontmatter: { type: { eq: "Project" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 4
    ) {
      edges {
        node {
          frontmatter {
            type
            title
            desc
            date
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
        }
      }
    }
    eventHero: file(relativePath: { eq: "eventHero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    paperclip: file(relativePath: { eq: "Item/Paperclip.png" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    mug: file(relativePath: { eq: "Item/Mug.png" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

export default IndexPage;

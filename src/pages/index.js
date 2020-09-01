import React from "react";
import { Link, graphql } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Newsletter from "../components/Newsletter";
import Hero from "../components/Hero";
import PreferPaper from "../components/PreferPaper";

const CardText = ({ title, desc, excerpt, tags, slug }) => (
  <Link to={slug} key={slug} className=" h-full">
    <div className="cursor-pointer  h-full mb-3 duration-500 ease-in-out transform hover:scale-105">
      <div className="relative p-8 pb-16 bg-default h-full text-default shadow-lg rounded-lg">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="mt-2">{desc ? desc : excerpt}</p>
        </div>
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
  </Link>
);

CardText.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

const Card = ({ title, desc, tags, path, coverimg }) => (
  <Link to={path} key={path} className=" h-full">
    <div className="card w-full cursor-pointer h-full mb-4 duration-500 ease-in-out transform hover:scale-105">
      <div className="bg-default text-default shadow-lg h-full rounded-lg rounded ">
        <div className="block">
          <figure className="relative tint mb-5 h-48 w-full">
            <Img
              fluid={coverimg.childImageSharp.fluid}
              className="rounded-t h-full"
            />
          </figure>
        </div>
        <div className="p-5 pb-16">
          <p className="font-semibold text-xl">{title}</p>
          <p className="text-default text-base">{desc}</p>
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
  desc: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  coverimg: PropTypes.shape({
    childImageSharp: PropTypes.shape({ fluid: PropTypes.string.isRequired }),
  }),
};

function IndexPage({ data }) {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <Hero />
      <section className="text-secondary bg-secondary  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h1 className="inline-block p-3 mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">
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
          <h1 className="inline-block p-3 mb-4 text-2xl md:text-3xl lg:text-4xl font-bold">
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
      <section className="text-center text-secondary bg-secondary relative">
        <Img
          fluid={data.eventHero.childImageSharp.fluid}
          className="w-full h-full opacity-50"
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
          <h1 className="mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Conferences and Hackathons
          </h1>
          <Link to="/events">
            <button className="btn max-w-md w-8/12 py-3 px-5">
              Upcoming Events
            </button>
          </Link>
        </div>
      </section>
      <section className="text-primary bg-primary  ">
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

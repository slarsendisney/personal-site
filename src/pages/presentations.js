import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { connect } from "react-redux";
import SmoothCollapse from "react-smooth-collapse";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Start = ({ data, presentation }) => {
  const { nodes } = data.allMdx;
  return (
    <Layout>
      <SEO title="Presentations" socialcard="social-card-presentations" />
      <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
        <h3 className="text-4xl font-semibold mb-1">Presentations</h3>

        <SmoothCollapse expanded={presentation && presentation.deck}>
          <Link
            to={
              presentation
                ? presentation.deck + "/slides/" + presentation.slide
                : "/"
            }
            style={{ textDecoration: "none" }}
          >
            <div className="flex is-pink-bg-always is-white-always margin-5-b margin-3-lr pad-3 border-radius">
              <h4 className="margin-0">
                Sam is currently presenting "
                {presentation &&
                  nodes.find(
                    (item) =>
                      presentation &&
                      presentation.deck === item.frontmatter.path
                  ).frontmatter.title}
                ". Click to follow along!
              </h4>
            </div>
          </Link>
        </SmoothCollapse>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ...nodes.filter(
              (item) =>
                presentation && presentation.deck === item.frontmatter.path
            ),
            ...nodes.filter(
              (item) =>
                !presentation ||
                (presentation && presentation.deck !== item.frontmatter.path)
            ),
          ].map((item) => {
            const { title, path, desc, hero, location } = item.frontmatter;
            return (
              <div
                className="duration-500 ease-in-out transform hover:scale-105"
                key={title}
              >
                <div
                  className={`bg-secondary rounded  ${
                    presentation && presentation.deck === path ? "pulse" : ""
                  }`}
                  style={{
                    height: "100%",
                    maxWidth: 320,
                    margin: "auto",
                  }}
                >
                  <Link
                    to={
                      presentation && presentation.deck === path
                        ? path + "/slides/" + presentation.slide
                        : path + "/slides/0"
                    }
                    className=" "
                  >
                    <Img
                      fluid={hero.childImageSharp.fluid}
                      style={{
                        maxHeight: 200,
                      }}
                      className="pres-image rounded-t is-light-grey-border"
                    />

                    <div className="p-3">
                      <h1 className="margin-0-b link text-2xl">{title}</h1>
                      <h4 className="margin-0-b margin-1-t">{desc}</h4>
                      <p className="opacity-75">{location}</p>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { type: { eq: "Presentation" } } }
    ) {
      nodes {
        frontmatter {
          path
          title
          desc
          location
          hero {
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
`;

const mapStateToProps = ({ presentation }) => {
  return { presentation };
};

const ConnectedStart =
  typeof window !== `undefined` ? connect(mapStateToProps, null)(Start) : Start;

export default ConnectedStart;

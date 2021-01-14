import React from "react";
import { Link, graphql } from "gatsby";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Card } from "./projects";
import { CardText } from "./articles";

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { totalCount } = data.allMdx;
  return (
    <Layout>
      <SEO
        title={`"${tag}"`}
        description={`Content I have written tagged with "${tag}"`}
      />
      <section className="text-secondary bg-default">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <h3 className="text-2xl mb-5">
            {totalCount} ITEMS TAGGED WITH {` `}
            <span className="font-bold bg-accent text-primary ml-1 py-1 px-2 rounded">
              {tag.toUpperCase()}
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4">
            {data.allMdx.edges.map((content, index) => {
              if (index % 2 === 0) {
                return (
                  <div key={content.node.frontmatter.title}>
                    <CardText
                      noMargin
                      bg="bg-white"
                      text="text-grey"
                      {...content.node.frontmatter}
                      slug={
                        content.node.frontmatter.type === "Article"
                          ? content.node.fields.slug
                          : content.node.frontmatter.path
                      }
                    />
                  </div>
                );
              }
              return (
                <div
                  key={content.node.frontmatter.title}
                  className="row-span-2"
                >
                  <Card
                    noMargin
                    bg="bg-white"
                    text="text-grey"
                    {...content.node.frontmatter}
                    path={
                      content.node.frontmatter.type === "Article"
                        ? content.node.fields.slug
                        : content.node.frontmatter.path
                    }
                  />
                </div>
              );
            })}
          </div>
          <h3 className="text-2xl my-3">ALL TAGS</h3>
          <div className="flex flex-wrap">
            {data.tags.group.map(({ tag }) => (
              <Link
                key={tag}
                to={`/tags/${tag}`}
                className="font-bold bg-accent hover:bg-accent-light text-primary ml-1 mb-1 py-1 px-2 rounded"
              >
                {tag.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

Tags.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf({}),
    }),
    tags: PropTypes.shape({
      group: PropTypes.arrayOf({
        tag: PropTypes.string.isRequired,
      }),
    }),
  }),
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
};

export default Tags;

export const pageQuery = graphql`query ($tag: String) {
  tags: allMdx(filter: {frontmatter: {type: {eq: "Article"}}}) {
    group(field: frontmatter___tags) {
      tag: fieldValue
      totalCount
    }
  }
  allMdx(limit: 2000, sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {tags: {in: [$tag]}, type: {in: ["Project", "Article"]}}}) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          date
          desc
          path
          type
          featured
          tags
          coverimg {
            childImageSharp {
              gatsbyImageData(maxWidth: 400, placeholder: NONE, layout: FLUID)
            }
          }
        }
      }
    }
  }
}
`;

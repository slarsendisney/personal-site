import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { format } from "date-fns";
import PropTypes from "prop-types";
import getAllArticles from "../utils/getAllArticles";

const monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const Trend = ({ data }) => {
  const allViewsPerDate = data.allViewsPerDate.edges; //.slice( data.allViewsPerDate.edges.length - 14);
  const maxViews = data.maxViews.edges[0].node.views;
  const α = 0.7;
  const B = 1000;
  const normalisedViews = allViewsPerDate.map((item) => ({
    node: {
      ...item.node,
      standard: (1 - α) * item.node.views + α * B,
    },
  }));
  const normalisedMax = (1 - α) * maxViews + α * B;

  const projects = data.projects.edges.reduce((acc, cur) => {
    const date = new Date(cur.node.frontmatter.date);
    acc[format(date, "yyyyMMdd")] = cur.node.frontmatter.title;
    return acc;
  }, {});
  const articles = getAllArticles(data).reduce((acc, cur) => {
    const date = new Date(cur.pubDate);
    acc[format(date, "yyyyMMdd")] = cur.title;
    return acc;
  }, {});

  const completeArticles = articles;

  const decks = data.decks.nodes.reduce((acc, cur) => {
    const date = new Date(cur.frontmatter.date);

    acc[format(date, "yyyyMMdd")] = cur.frontmatter.title;
    return acc;
  }, {});
  return (
    <>
      <div className="mb-3 flex items-center">
        <div
          className="bg-primary mr-2"
          style={{
            height: 15,
            width: 15,
            borderRadius: 7.5,
          }}
        />
        <p className="mr-4">Article Added</p>
        <div
          className="bg-secondary mr-2"
          style={{
            height: 15,
            width: 15,
            borderRadius: 7.5,
          }}
        />
        <p className="mr-4">Deck Added</p>
        <div
          className="bg-accent mr-2"
          style={{
            height: 15,
            width: 15,
            borderRadius: 7.5,
          }}
        />
        <p className="">Project Added</p>
      </div>

      <div
        className="col-xs-12 margin-1-t flex "
        style={{ height: 10, justifyContent: "center" }}
      >
        {allViewsPerDate.map((item, index) => {
          return (
            <div
              key={`bar-${index}`}
              className="mr-1  text-align-center"
              style={{
                position: "relative",
                width: 100 / allViewsPerDate.length + "%",
              }}
            >
              {(item.node.date.slice(-2) === "01" || index === 0) && (
                <p className="text-sm">
                  <strong>
                    {
                      monthNames[
                        parseInt(item.node.date.slice(-4).slice(0, 2)) - 1
                      ]
                    }
                  </strong>
                </p>
              )}
            </div>
          );
        })}
      </div>
      <div
        className="col-xs-12 mt-4 flex"
        style={{ height: 10, justifyContent: "center" }}
      >
        {allViewsPerDate.map((item) => {
          return (
            <div
              key={item.node.date}
              className="mr-1 text-align-center"
              style={{
                position: "relative",
                width: 100 / allViewsPerDate.length + "%",
              }}
            >
              <p className="text-xs opacity-80 hidden md:block">
                {item.node.date.slice(-2)}
              </p>
            </div>
          );
        })}
      </div>
      <div
        className="col-xs-12 md:mt-3 flex"
        style={{ height: 100, justifyContent: "center" }}
      >
        {normalisedViews.map((item, index) => {
          return (
            <div
              key={`normalised-${index}`}
              className="bg-secondary rounded mr-1"
              style={{
                position: "relative",
                width: 100 / allViewsPerDate.length + "%",
              }}
              data-tip={`${item.node.views} views`}
            >
              <div
                className="bg-accent rounded mr-1"
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: Math.floor(
                    (item.node.standard / normalisedMax) * 100
                  ),
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        className="col-xs-12 margin-1-t flex"
        style={{ justifyContent: "center" }}
      >
        {allViewsPerDate.map((item) => {
          return (
            <div
              key={item.node.date}
              className="flex  mr-1"
              style={{
                width: 100 / allViewsPerDate.length + "%",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {completeArticles[item.node.date] && (
                <div
                  className="bg-primary my-1"
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 7.5,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  data-tip={`"${
                    completeArticles[item.node.date]
                  }" Article Added`}
                />
              )}
              {decks[item.node.date] && (
                <div
                  className="bg-logo-three my-1"
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 7.5,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  data-tip={`"${decks[item.node.date]}" Deck Added`}
                />
              )}
              {projects[item.node.date] && (
                <div
                  className="bg-accent my-1"
                  style={{
                    height: 15,
                    width: 15,
                    borderRadius: 7.5,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                  data-tip={`"${projects[item.node.date]}" Project Added`}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

Trend.propTypes = {
  data: PropTypes.shape({
    allViewsPerDate: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    projects: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    decks: PropTypes.shape({
      nodes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
    maxViews: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            views: PropTypes.number,
          }),
        })
      ),
    }),
  }),
};
const TrendView = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          maxViews: allViewsPerDate(
            sort: { fields: views, order: DESC }
            limit: 1
          ) {
            edges {
              node {
                views
              }
            }
          }
          allViewsPerDate(sort: { fields: date, order: ASC }) {
            edges {
              node {
                views
                date
              }
            }
          }

          projects: allMdx(
            filter: { frontmatter: { type: { eq: "Project" } } }
          ) {
            edges {
              node {
                frontmatter {
                  date
                  title
                }
              }
            }
          }
          allMdx(filter: { frontmatter: { type: { eq: "Article" } } }) {
            edges {
              node {
                frontmatter {
                  title
                  date
                }
              }
            }
          }
          decks: allMdx(filter: { frontmatter: { type: { ne: "Article" } } }) {
            nodes {
              frontmatter {
                date
                title
              }
            }
          }
        }
      `}
      render={(data) => <Trend data={data} />}
    />
  );
};

export default TrendView;

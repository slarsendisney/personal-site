import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const Footer = ({ location }) => {
  return (
    <footer>
      <StaticQuery
        query={graphql`
          {
            allPageViews {
              edges {
                node {
                  totalCount
                  path
                  sessions
                }
              }
            }
            siteWideStats {
              sessions
              pageViews
            }
            Articles: allMdx(
              filter: { frontmatter: { type: { eq: "Article" } } }
              sort: { fields: frontmatter___date, order: DESC }
              limit: 5
            ) {
              edges {
                node {
                  frontmatter {
                    title
                  }
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `}
        render={(data) => {
          const pageViews = data.allPageViews.edges.find(
            (item) => item.node.path === location.pathname
          );

          return (
            <>
              <div className="bg-secondary py-4 text-default">
                <div className="container px-4 mx-auto">
                  <div className="-mx-4 flex flex-wrap justify-between">
                    <div className="px-4 my-4 w-full xl:w-1/5">
                      <h4 className="text-xl mb-3 font-bold">
                        I&apos;m Sam Larsen-Disney.
                      </h4>
                      <p className="text-sm mb-3">
                        I currently work as a UX Engineer at American Express. I
                        enjoy teaching the next generation to code through my
                        articles, presentations and at hackathons.
                      </p>
                      <Link to="/this-site">
                        <button className="btn-sm-accent font-semibold">
                          About This Site
                        </button>
                      </Link>
                    </div>

                    <div className="px-4 my-4 w-full sm:w-auto">
                      <div>
                        <h4 className="text-xl mb-3 font-bold">Good Stuff</h4>
                      </div>
                      <ul className="text-sm">
                        <li className="mb-2">
                          <Link to="/about" className="hover:text-link ">
                            About Me
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link to="/stats" className="hover:text-link ">
                            Site Stats
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link to="/newsletter" className="hover:text-link ">
                            Newsletter
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link to="/projects" className="hover:text-link ">
                            Projects
                          </Link>
                        </li>
                        <li className="mb-2">
                          <Link to="/disclaimer" className="hover:text-link ">
                            Disclaimer
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="px-4 my-4 w-full sm:w-auto">
                      <div>
                        <h4 className="text-xl mb-3 font-bold">Recent Posts</h4>
                      </div>

                      <ul className="text-sm">
                        {data.Articles.edges.map(
                          ({ node: { fields, frontmatter } }) => (
                            <li className="mb-2" key={fields.slug}>
                              <Link
                                className="hover:text-link "
                                to={fields.slug}
                              >
                                {frontmatter.title}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="px-4 my-4 w-full sm:w-auto xl:w-1/5">
                      <div>
                        <h4 className="text-xl mb-1 font-bold">Connect</h4>
                        <p>Lets start a discussion on the interwebs.</p>
                      </div>
                      <div className="text-4xl flex flex-wrap items-center ">
                        <OutboundLink
                          href="https://twitter.com/SamLarsenDisney"
                          className="hover:text-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="lab la-twitter "></i>
                        </OutboundLink>
                        <OutboundLink
                          href="https://www.linkedin.com/in/samuel-larsen-disney"
                          className="hover:text-link"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="lab la-linkedin-in mr-1"></i>
                        </OutboundLink>
                      </div>
                      <Link to="/stats" className="hover:text-link mt-3 ">
                        <p className="text-sm opacity-75">
                          {pageViews
                            ? `This page has recieved ${pageViews.node.totalCount} page
                        views across ${pageViews.node.sessions} sessions`
                            : `This site has recieved a total of 
                        ${data.siteWideStats.pageViews} views across
                        ${data.siteWideStats.sessions} sessions`}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary py-4 text-primary">
                <div className="container mx-auto px-4">
                  <div className="-mx-4 flex flex-wrap justify-between">
                    <div className="px-4 w-full text-center sm:w-auto sm:text-left text-sm">
                      Copyright &copy; {new Date().getFullYear() + " "}
                      Sam Larsen-Disney. All Rights Reserved.
                    </div>
                    <div className="px-4 w-full text-center sm:w-auto sm:text-left text-sm flex items-center">
                      Made with <i className="las la-heart mx-1"></i>
                      by SLD
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      />
    </footer>
  );
};

Footer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};

export default Footer;

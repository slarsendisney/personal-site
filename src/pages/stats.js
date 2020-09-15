import React from "react";
import { graphql, Link } from "gatsby";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Emojione } from "react-emoji-render";
import SEO from "../components/seo";
import Layout from "../components/layout";
import StatsCard from "../components/StatsCard";
import {
  useCollectionOnce,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import Trend from "../components/Trend";
import firebase from "gatsby-plugin-firebase";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const colours = ["primary", "accent", "secondary", "accent"];

const Stats = ({ data, count, foundTheme }) => {
  const [value, loading, error] = useCollectionOnce(
    typeof window !== "undefined"
      ? firebase.firestore().collection("likes")
      : ""
  );

  const [coffees, loadingCoffees] = useDocumentDataOnce(
    typeof window !== "undefined"
      ? firebase.firestore().doc("coffee/ko-fi")
      : ""
  );

  const { JavaScript, Markdown, Sass, JSON, SUM } = data.statsJson;
  const totalCount = data.gitHubProfile.commitsOnRepo;
  const { forks, stars } = data.gitHubProfile;
  const totalViews = data.siteWideStats.pageViews;
  const totalSessions = data.siteWideStats.sessions;
  const cards = { JavaScript, Markdown, Sass, JSON };

  const statsByCodeCount = [];
  const statsByFileCount = [];
  let remainingPct = 100;
  Object.keys(cards).forEach((key) => {
    remainingPct =
      remainingPct - Math.floor((cards[key].code / SUM.code) * 100);
    cards[key].percentage = Math.floor((cards[key].code / SUM.code) * 100);
  });
  Object.keys(cards).forEach((item) => {
    statsByCodeCount.push({
      name: item,
      value: cards[item].code,
    });
    statsByFileCount.push({
      name: item,
      value: cards[item].nFiles,
    });
  });
  const reacts =
    loading || error
      ? {
          total: "...",
          fire: "...",
          unicorn: "...",
          popcorn: "...",
          avo: "...",
        }
      : value.docs.reduce((acc, cur) => {
          const obj = cur.data();
          Object.keys(obj).map((key) => {
            if (acc.total) {
              acc.total = acc.total + (obj[key] >= 0 ? obj[key] : 0);
            } else {
              acc.total = obj[key];
            }
            if (acc[key]) {
              acc[key] = acc[key] + obj[key];
            } else {
              acc[key] = obj[key];
            }
          });
          return acc;
        }, {});
  return (
    <Layout>
      <SEO
        location={location}
        title="Stats"
        description="Ever wondered how many lines of code are at work here?"
      />
      <section className="text-secondary bg-default  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 article">
          <h2 className="text-base">
            You are{" "}
            {count > 1 ? (
              <>
                among <span className="text-link">{count}</span> people{" "}
              </>
            ) : (
              <>
                {" "}
                the only <span className="text-link">1</span>{" "}
              </>
            )}
            currently visiting the site. The site has recieved{" "}
            <span className="text-link">
              {totalViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>{" "}
            page views across{" "}
            <span className="text-link">
              {totalSessions.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            </span>
            sessions.{" "}
          </h2>
          <h2 className=" margin-2-t ">
            Themes have been toggled{" "}
            <span className="text-link">
              {data.darkModeToggles.totalEvents}
            </span>{" "}
            times. Easter eggs on this site have been triggered{" "}
            <span className="text-link">{data.eggTriggers.totalEvents}</span>{" "}
            times.
          </h2>
          <h2 className="text-base">
            In total, I have written{" "}
            <span className="text-accent">{data.articleCount.totalCount}</span>{" "}
            articles. Articles have been reacted to{" "}
            <span className="text-accent">
              {reacts.total ? reacts.total : "X"}
            </span>{" "}
            times with{" "}
            <span className="text-link">{reacts.avo ? reacts.avo : "X"}</span>{" "}
            <Emojione text={"🥑"} className="mt-3 inline-block" />,{" "}
            <span className="text-link">
              {reacts.popcorn ? reacts.popcorn : "X"}
            </span>{" "}
            <Emojione text={"🍿"} className="mt-3  inline-block" />,{" "}
            <span className="text-link">{reacts.fire ? reacts.fire : "X"}</span>{" "}
            <Emojione text={"🔥"} className="mt-3  inline-block" /> and{" "}
            <span className="text-link">
              {reacts.unicorn ? reacts.unicorn : "X"}
            </span>{" "}
            <Emojione text={"🦄"} className="mt-3  inline-block" />.
          </h2>

          <h2 className="">
            The latest build of this site has{" "}
            <span className="text-link">{SUM.code}</span> lines of code,{" "}
            <span className="text-link">{SUM.comment}</span> comments and{" "}
            <span className="text-link">{totalCount}</span> commits*.
          </h2>
        </div>
      </section>
      <section className="text-secondary bg-secondary  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 article">
          <p className="margin-0 margin-1-b text-xl">SPONSORS</p>
          <h2 className="font-normal">
            Some incredibly generous people have bought me{" "}
            <span className="text-link">
              {loadingCoffees ? "..." : coffees.count}
            </span>{" "}
            coffees to help power my creativity. The most recent coffee was
            bought by{" "}
            <span className="text-link">
              {loadingCoffees ? "..." : coffees.recent}
            </span>{" "}
            . Thanks for supporting what I do - you&apos;re awesome.{" "}
            <Emojione text={"❤️"} className="inline-block mt-3" />
          </h2>
          <Link to="/sponsor">
            <button className="btn-accent mt-3">Sponsor Me</button>
          </Link>
        </div>
      </section>
      <section className="text-secondary bg-default  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <div className="row container pad-10-tb pad-3-lr">
            <h4 className="m-0 mb-3 text-xl">VIEWS OVER LAST FORTNIGHT</h4>
            <Trend />
          </div>
        </div>
      </section>
      <section className="text-secondary bg-secondary  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 ">
          <div className="row container pad-10-tb pad-3-lr">
            <div className="flex mb-3">
              <h4 className="margin-0-b text-xl">
                POPULAR PAGES - LAST 30 DAYS
              </h4>
            </div>
            <div className="grid grid-cols-3">
              <div className="">
                <h3 className="text-xl font-semibold">Page</h3>
              </div>
              <div className="">
                <h3 className="text-xl font-semibold">Views</h3>
              </div>
              <div className="">
                <h3 className="text-xl font-semibold">Sessions</h3>
              </div>

              {data.allPageViews.edges.slice(0, 5).map((item) => (
                <>
                  <div className="">
                    <Link to={item.node.path} className="is-special-blue">
                      <p className="margin-0">{item.node.path}</p>
                    </Link>
                  </div>
                  <div className="">
                    <p className="margin-0 margin-1-b">
                      {item.node.totalCount}
                    </p>
                  </div>
                  <div className="">
                    <p className="margin-0 margin-1-b">{item.node.sessions}</p>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="text-secondary bg-default  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
          <div className="row container pad-10-tb pad-3-lr">
            <div className="is-grey">
              <h4 className="margin-0 text-xl">
                PROJECT BREAKDOWN BY LANGUAGE
              </h4>
            </div>

            <div className="my-3">
              <div className="flex margin-1-t h-6">
                {Object.keys(cards).map(function (item, index) {
                  return (
                    <div
                      key={item}
                      className={`bg-${colours[index]} h-full`}
                      style={{
                        width: `${cards[item].percentage}%`,

                        borderTopLeftRadius: index === 0 ? 5 : 0,
                        borderBottomLeftRadius: index === 0 ? 5 : 0,
                      }}
                      data-tip={`${cards[item].percentage}% ${item}`}
                    />
                  );
                })}
                <div
                  className={`bg-primary h-full`}
                  data-tip={`${remainingPct}% Other`}
                  style={{
                    width: `${remainingPct}%`,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {Object.keys(cards).map(function (item) {
                return <StatsCard key={item} name={item} {...cards[item]} />;
              })}
            </div>
          </div>
        </div>
      </section>
      <section className="text-secondary bg-secondary  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 ">
          <div className="row container pad-10-tb pad-3-lr">
            <div className="is-grey">
              <h4 className="margin-0 margin-1-b text-xl">GITHUB REPO</h4>
              <h2 className="text-2xl font-semibold my-3">
                This site&apos;s repository has been starred{" "}
                <span className="text-link">{stars}</span> times and forked{" "}
                <span className="text-link">{forks}</span> times.
              </h2>
              <div className="flex flex-wrap">
                <OutboundLink
                  href="https://github.com/slarsendisney"
                  target="_blank"
                  rel="noreferrer"
                  className="mr-2 mb-2"
                >
                  <button className="btn-accent text-sm">
                    Follow me on GitHub
                  </button>
                </OutboundLink>
                <OutboundLink
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/slarsendisney/personal-site/fork"
                  className="mr-2 mb-2"
                >
                  <button className="btn-accent text-sm">Fork this repo</button>
                </OutboundLink>
                <OutboundLink
                  href="https://github.com/slarsendisney/personal-site"
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="btn-accent text-sm">Star this repo</button>
                </OutboundLink>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-secondary bg-default  ">
        <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16 article">
          <h2 className="">
            Want to know more about how this page works? I have written a
            &quot;deep dive&quot; article that goes into detail about
            integrating and using stats with code examples.
          </h2>
          <Link to="/articles/Deep-Dive-Into-My-Stats-Page">
            <button className="btn-accent text-sm">Take Me There</button>
          </Link>
          <p className="mt-10 text-sm">
            * Code count only accounts for code I have written myself. Page
            views, sessions, events and commit count are refreshed daily at 9PM
            GMT.{" "}
            <span
              className="hover:text-link cursor-pointer"
              onClick={() => foundTheme("Fall Guys")}
            >
              Have a theme for reading the small print!
            </span>
          </p>
        </div>
      </section>
    </Layout>
  );
};

Stats.propTypes = {
  count: PropTypes.number.isRequired,
  foundTheme: PropTypes.func.isRequired,
  data: PropTypes.shape({
    statsJson: PropTypes.shape({
      JavaScript: PropTypes.number.isRequired,
      Markdown: PropTypes.number.isRequired,
      Sass: PropTypes.number.isRequired,
      JSON: PropTypes.number.isRequired,
      SUM: PropTypes.number.isRequired,
    }).isRequired,
    gitHubProfile: PropTypes.shape({
      commitsOnRepo: PropTypes.number.isRequired,
      forks: PropTypes.number.isRequired,
      stars: PropTypes.number.isRequired,
    }).isRequired,
    darkModeToggles: PropTypes.shape({
      totalEvents: PropTypes.number.isRequired,
    }).isRequired,
    eggTriggers: PropTypes.shape({
      totalEvents: PropTypes.number.isRequired,
    }).isRequired,
    articleCount: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
    }).isRequired,
    siteWideStats: PropTypes.shape({
      pageViews: PropTypes.number.isRequired,
      sessions: PropTypes.number.isRequired,
    }).isRequired,
    allPageViews: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
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
    articleCount: allMdx(filter: { frontmatter: { type: { eq: "Article" } } }) {
      totalCount
    }
    siteWideStats {
      pageViews
      sessions
    }
    eggTriggers: siteEvents(eventLabel: { eq: "Egg-Nav" }) {
      totalEvents
    }
    darkModeToggles: siteEvents(eventLabel: { eq: "Dark Mode Toggle Button" }) {
      totalEvents
    }
    gitHubProfile {
      totalContributions
      commitsOnRepo
      forks
      stars
    }
    statsJson {
      JavaScript {
        nFiles
        comment
        code
        blank
      }
      Markdown {
        blank
        code
        comment
        nFiles
      }
      Sass {
        blank
        code
        comment
        nFiles
      }
      JSON {
        blank
        code
        comment
        nFiles
      }
      SUM {
        blank
        code
        comment
        nFiles
      }
    }
  }
`;

const mapStateToProps = ({ count }) => {
  return { count };
};

const mapDispatchToProps = (dispatch) => {
  return {
    foundTheme: (theme) => dispatch({ type: "foundTheme", data: theme }),
  };
};

const ConnectedStats =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(Stats)
    : Stats;

export default ConnectedStats;

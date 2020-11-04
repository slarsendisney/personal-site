import React, { useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Events from "../data/events.json";
import isFuture from "date-fns/isFuture";
import parse from "date-fns/parse";
import format from "date-fns/format";

const EventBlock = ({ events, setVideoModalVisibility }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
      {events.map((event) => (
        <div
          className="bg-secondary p-5 rounded"
          key={event.talk + event.event}
        >
          <div className="">
            <h3 className="font-semibold mb-1">{event.talk}</h3>
            <p className="my-1">
              {event.event} | {event.location}
            </p>

            <p className="margin-0-t">{event.description}</p>

            <p className="margin-3-b">
              {format(
                parse(event.date, "yyyy-MM-dd", new Date()),
                "iii, dd MMM yyyy"
              )}
            </p>
            <div className="grid grid-cols-2 gap-2 -mx-2">
            <OutboundLink href={event.link}>
              <button className="btn-sm-accent mx-1 mt-2 flex items-center justify-center w-full"><i class="las la-info-circle text-2xl -my-4"></i>More Info</button>
            </OutboundLink>
            {event.video && <button className="btn-sm-accent mx-1 mt-2 flex items-center justify-center w-full" onClick={()=>setVideoModalVisibility(event.video)}><i class="las la-play-circle text-2xl -my-4"></i> Play Video</button>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
EventBlock.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      talk: PropTypes.string.isRequired,
      event: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    }).isRequired
  ),
};
const EventsPage = ({ data }) => {
  const [showVideoModal, setVideoModalVisibility] = useState(false)
  const upcoming = Events.filter((event) =>
    isFuture(parse(event.date, "yyyy-MM-dd", new Date()))
  );
  const past = Events.filter(
    (event) => !isFuture(parse(event.date, "yyyy-MM-dd", new Date()))
  );
  return (
    <Layout>
      <SEO
        keywords={[`Sam`, `Larsen-Disney`, `Events`]}
        title="Events"
        socialcard={"social-card-events"}
      />
      {showVideoModal && <div className="fixed top-0 right-0 w-full h-full flex items-center justify-center" style={{zIndex:1000, backgroundColor:'#00000095'}}>
        <div style={{width:"80%", maxWidth:1000}}>
          <div className="flex">
          <button className="ml-auto text-2xl flex items-center justify-center text-primary hover:text-link" onClick={() => setVideoModalVisibility(false)}>Close <i class="las la-times-circle  text-4xl"></i></button>
          </div>
          <div
      className="video"
      style={{
        position: "relative",
        paddingBottom: "56.25%" /* 16:9 */,
        paddingTop: 25,
        height: 0
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
        src={showVideoModal}
        frameBorder="0"
      />
    </div>
      </div>
        </div>}
      <section className="text-center text-white bg-default relative">
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
          className="relative w-full max-w-4xl px-4 py-24 mx-auto md:px-8 md:py-32"
          style={{
            zIndex: 500,
          }}
        >
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-semibold">
            Events & Hackathons
          </h1>
        </div>
      </section>

      <div className="flex-1 w-full max-w-4xl px-4 py-8 mx-auto md:px-8 md:py-16">
        <h2 className="text-2xl">Speaker Bio</h2>
        <div className="grid grid-cols-4 gap-4 my-3">
          <div className="col-span-4 md:col-span-1">
            <Img
              fluid={data.face.childImageSharp.fluid}
              style={{
                maxWidth: 150,
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
          <div className="col-span-4 md:col-span-3">
            <h3>
              Sam currently works as a UX Engineer at American Express. He has
              built new ways to refer friends, onboarding experiences and rapid
              response systems. He enjoys teaching the next generation to code
              through his articles, presentations and at hackathons.
            </h3>
            <div className="text-center md:text-left">
              <OutboundLink href={data.face.publicURL}>
                <button className="btn mt-3">Download my face</button>
              </OutboundLink>
            </div>
          </div>
        </div>

        {upcoming.length > 0 && (
          <>
            <h2 className="text-2xl">Upcoming Events</h2>
            <EventBlock events={upcoming} setVideoModalVisibility={setVideoModalVisibility} />
          </>
        )}
        {past.length > 0 && (
          <>
            <div className="col-xs-12 ">
              <h2 className="text-2xl">Past Events</h2>
            </div>
            <EventBlock events={past} setVideoModalVisibility={setVideoModalVisibility} />
          </>
        )}
      </div>
    </Layout>
  );
};

EventsPage.propTypes = {
  data: PropTypes.shape({
    eventHero: PropTypes.shape({
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    face: PropTypes.shape({
      publicURL: PropTypes.string.isRequired,
      childImageSharp: PropTypes.shape({
        fluid: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

export const query = graphql`
  {
    eventHero: file(relativePath: { eq: "eventHero.png" }) {
      childImageSharp {
        fluid(maxWidth: 1200) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    face: file(relativePath: { eq: "face.png" }) {
      publicURL
      childImageSharp {
        fluid(maxWidth: 400) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`;

export default EventsPage;

import React from "react"
import Img from "gatsby-image/withIEPolyfill"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Events from "../data/events.json"
import isFuture from "date-fns/isFuture"
import parse from "date-fns/parse"
import format from "date-fns/format"

const EventBlock = ({ events }) => {
  return (
    <>
      {events.map((event) => (
        <div className="col-xs-12 col-md-6 col-lg-4">
          <div className="fill-height fill-width pad-3 pad-5-tb is-white-bg is-grey margin-3-b">
            <h3 className="bold margin-1-tb">{event.talk}</h3>
            <p className="margin-2-tb">
              {event.event} | {event.location}
            </p>
            <div
              className="line-sm opacity-10 margin-2-b"
              style={{ width: "30%" }}
            ></div>
            <p className="margin-0-t">{event.description}</p>

            <p className="margin-3-b">
              {format(
                parse(event.date, "yyyy-MM-dd", new Date()),
                "iii, dd MMM yyyy"
              )}
            </p>
            <a href={event.link}>
              <button className="bubble-button border-radius-sm pad-2">
                More Info
              </button>
            </a>
          </div>
        </div>
      ))}
    </>
  )
}
export default ({ data }) => {
  const upcoming = Events.filter((event) =>
    isFuture(parse(event.date, "yyyy-MM-dd", new Date()))
  )
  const past = Events.filter(
    (event) => !isFuture(parse(event.date, "yyyy-MM-dd", new Date()))
  )
  return (
    <Layout>
      <SEO title="Events" />
      <div className="is-grey is-light-grey-bg pad-10-b">
        <div className="row" style={{ position: "relative", minHeight: 350 }}>
          <Img
            fluid={data.eventHero.childImageSharp.fluid}
            style={{
              width: "100%",
              height: "100%",
              zIndex: 1,
              position: "absolute",
            }}
            objectPosition="75% 50%"
          />
          <div
            className="col-xs-12 flex align-horizontal align-vertical"
            style={{ zIndex: 1, width: "100%", backgroundColor: "#00000080" }}
          >
            <div className="text-align-center">
              <h1 className="margin-0-tb" style={{ fontSize: "5em" }}>
                Events
              </h1>
              <div
                className="line is-grey margin-3-t "
                style={{ width: "60vw", margin: "auto" }}
              />
            </div>
          </div>
        </div>
        <div className="row container-small pad-3-lr pad-10-t pad-20-b">
          <div className="col-xs-12 ">
            <h2>Speaker Bio</h2>
          </div>
          <div className="col-xs-12 col-lg-2">
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
          <div className="col-xs-12 col-lg-9">
            <h3>
              Sam currently works as a UX Engineer at American Express. He has
              built new ways to refer friends, onboarding experiences and rapid
              response systems. He enjoys teaching the next generation to code
              through his articles, presentations and at hackathons.
            </h3>
            <a href={data.face.publicURL}>
              <button className="bubble-button border-radius-sm pad-2">
                Download my face
              </button>
            </a>
          </div>
          {upcoming.length > 0 && (
            <>
              <div className="col-xs-12 margin-5-t">
                <h2>Upcoming Events</h2>
              </div>
              <EventBlock events={upcoming} />
            </>
          )}
          {past.length > 0 && (
            <>
              <div className="col-xs-12 ">
                <h2>Past Events</h2>
              </div>
              <EventBlock events={past} />
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

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
`

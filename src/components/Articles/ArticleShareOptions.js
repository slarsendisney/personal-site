import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from "react-share"
import Links from "../../data/links.json"
import Subscribe from "./Subscribe.js"
import { OutboundLink } from "gatsby-plugin-google-analytics"

export default ({ location }) => (
  <>
    <div className="">
      <div className="row flex" style={{ justifyContent: "center" }}>
        <div className="col-xs-12  text-align-center">
          <FacebookShareButton url={location.href} className="grow">
            <FacebookIcon round={true} style={{ height: 40 }} />
          </FacebookShareButton>
          <LinkedinShareButton url={location.href} className="grow">
            <LinkedinIcon round={true} style={{ height: 40 }} />
          </LinkedinShareButton>
          <TwitterShareButton url={location.href} className="grow">
            <TwitterIcon round={true} style={{ height: 40 }} />
          </TwitterShareButton>
        </div>
      </div>
      <div className="col-xs-12 margin-5-b">
        <div className="line-sm margin-5-tb" />
        <Subscribe />
      </div>
    </div>
    <div className="is-white-bg pad-5 border-radius">
      <div className="row flex" style={{ justifyContent: "center" }}>
        <div className="col-xs-12 col-sm-3 flex align-vertical align-horizontal">
          <StaticQuery
            query={graphql`
              query {
                file(relativePath: { eq: "face.png" }) {
                  childImageSharp {
                    fluid(maxWidth: 400) {
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            `}
            render={(data) => (
              <Img
                fluid={data.file.childImageSharp.fluid}
                style={{
                  maxWidth: 150,
                  width: "95%",
                }}
              />
            )}
          />
        </div>
        <div className="col-xs-12 col-sm-9 margin-5-b">
          <h3>
            I’m Sam Larsen-Disney. I document the cool things I learn and enjoy
            helping the next generation to code. My site has no ads or sponsors.
            If you enjoy my content, please consider supporting what I do.
          </h3>
          <div>
            <div className="row pad-0">
              <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3 margin-3-b">
                <OutboundLink href={Links.buyMeACoffee}>
                  <button
                    className="bubble-button is-white-always border-radius pad-4-lr pad-2-tb"
                    style={{ width: "100%" }}
                  >
                    Buy me a coffee
                  </button>
                </OutboundLink>
              </div>
              <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3 margin-3-b">
                <OutboundLink href={Links.patreon}>
                  <button
                    className="bubble-button is-white-always border-radius pad-4-lr pad-2-tb"
                    style={{ width: "100%" }}
                  >
                    My Patreon
                  </button>
                </OutboundLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)

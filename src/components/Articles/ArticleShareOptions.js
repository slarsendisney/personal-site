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

export default ({ location }) => (
  <>
    <div className="pad-5-lr pad-5-b">
      <div className="row flex" style={{ justifyContent: "center" }}>
        <div className="col-xs-12  text-align-center">
          <h4>Share</h4>
        </div>
        <div className="col-xs-12  text-align-center">
          <FacebookShareButton url={location.href}>
            <FacebookIcon round={true} style={{ height: 40 }} />
          </FacebookShareButton>

          <LinkedinShareButton url={location.href}>
            <LinkedinIcon round={true} style={{ height: 40 }} />
          </LinkedinShareButton>

          <TwitterShareButton url={location.href}>
            <TwitterIcon round={true} style={{ height: 40 }} />
          </TwitterShareButton>
        </div>
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
                      # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                      ...GatsbyImageSharpFluid_noBase64
                    }
                  }
                }
              }
            `}
            render={data => (
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
        <div className="col-xs-12 col-sm-9">
          <h3>
            I’m Sam Larsen-Disney. I document the cool things I learn and enjoy
            helping the next generation to code. My site has no ads or sponsors.
            If you enjoy my content, please consider supporting what I do.
          </h3>
          <a href={Links.buyMeACoffee}>
            <button className="btn is-pink-bg is-white-always border-radius pad-3-lr pad-2-tb">
              ☕️ Buy me a coffee
            </button>
          </a>
        </div>
      </div>
    </div>
  </>
)

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import AnchorLink from "react-anchor-link-smooth-scroll"
import useDarkMode from "use-dark-mode"

export default ({ currentJob }) => {
  const darkMode = useDarkMode(false)
  return (
    <StaticQuery
      query={graphql`
        fragment bigimage on File {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        fragment medImage on File {
          childImageSharp {
            fluid(maxWidth: 125) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        fragment image on File {
          childImageSharp {
            fluid(maxWidth: 75) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        {
          BodyThinking: file(
            relativePath: { eq: "illustration/Body/Thinking.png" }
          ) {
            ...bigimage
          }
          Bulb: file(relativePath: { eq: "illustration/Item/Bulb.png" }) {
            ...image
          }
          Pencil: file(relativePath: { eq: "illustration/Item/Pencil.png" }) {
            ...image
          }
          Macbook: file(relativePath: { eq: "illustration/Item/Macbook.png" }) {
            ...medImage
          }
          MacbookDark: file(
            relativePath: { eq: "illustration/Item/Macbook-Dark.png" }
          ) {
            ...medImage
          }
          iPad: file(relativePath: { eq: "illustration/Item/iPad.png" }) {
            ...image
          }
          Paperclip: file(
            relativePath: { eq: "illustration/Item/Paperclip.png" }
          ) {
            ...medImage
          }
          Ribbon1: file(
            relativePath: { eq: "illustration/Item/Ribbon 1.png" }
          ) {
            ...image
          }
          Ribbon1Dark: file(
            relativePath: { eq: "illustration/Item/Ribbon 1-Dark.png" }
          ) {
            ...image
          }
          Ribbon2: file(
            relativePath: { eq: "illustration/Item/Ribbon 2.png" }
          ) {
            ...image
          }
          Ribbon3: file(
            relativePath: { eq: "illustration/Item/Ribbon 3.png" }
          ) {
            ...image
          }
          Ribbon4: file(
            relativePath: { eq: "illustration/Item/Ribbon 4.png" }
          ) {
            ...image
          }
          Ribbon10: file(
            relativePath: { eq: "illustration/Item/Ribbon 10.png" }
          ) {
            ...image
          }
          Ribbon10Dark: file(
            relativePath: { eq: "illustration/Item/Ribbon 10-Dark.png" }
          ) {
            ...image
          }
          Ribbon11: file(
            relativePath: { eq: "illustration/Item/Ribbon 11.png" }
          ) {
            ...image
          }
        }
      `}
      render={(data) => {
        return (
          <>
            <div className="row" style={{ paddingLeft: "1%" }}>
              <div className="col-xs-12 pad-5-tb">
                <div
                  class="top-wrapper text-align-center"
                  style={{ width: "100%", maxWidth: 1300 }}
                >
                  <div class="top-wrapper-box a" />
                  <div class="top-wrapper-box flex align-horizontal align-vertical">
                    {/* BULB */}
                    <div
                      style={{
                        position: "relative",
                        width: "50%",
                      }}
                    ></div>
                  </div>
                  <div class="top-wrapper-box c" />
                </div>
              </div>
              <div className="col-xs-12">
                <div
                  class="outer-wrapper text-align-center pad-10-t"
                  style={{ width: "100%", maxWidth: 1300 }}
                >
                  <div class="outer-wrapper-box a">
                    {/* LEFT SIDE */}
                    <div
                      className="row"
                      style={{ maxWidth: 200, marginLeft: "auto" }}
                    >
                      <div className="col-xs-12">
                        <Img
                          fluid={
                            darkMode.value
                              ? data.Ribbon1Dark.childImageSharp.fluid
                              : data.Ribbon1.childImageSharp.fluid
                          }
                          className="grow-lg"
                          style={{
                            maxWidth: 45,
                            width: "30%",
                            marginLeft: "auto",
                            marginRight: "-10%",
                          }}
                        />
                      </div>
                      <div className="col-xs-12">
                        <Img
                          fluid={data.Pencil.childImageSharp.fluid}
                          className="float-x"
                          style={{
                            maxWidth: 70,
                            marginTop: "5%",
                            marginRight: "10%",
                            width: "40%",
                            marginLeft: "auto",
                          }}
                        />
                      </div>
                      <div className="col-xs-12">
                        <Img
                          fluid={data.Ribbon2.childImageSharp.fluid}
                          className="grow-lg"
                          style={{
                            maxWidth: 45,
                            marginTop: "5%",
                            width: "30%",
                            marginLeft: "25%",
                            transform: "rotate(-90deg)",
                          }}
                        />
                      </div>
                      <div className="col-xs-12">
                        <div className="float-y-slow">
                          <Img
                            fluid={
                              darkMode.value
                                ? data.MacbookDark.childImageSharp.fluid
                                : data.Macbook.childImageSharp.fluid
                            }
                            style={{
                              maxWidth: 125,
                              marginTop: "5%",
                              marginBottom: "5%",
                              width: "80%",
                              marginLeft: "35%",
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-xs-12 pad-1-t">
                        <Img
                          fluid={data.Ribbon11.childImageSharp.fluid}
                          className="grow-lg"
                          style={{
                            maxWidth: 65,
                            marginTop: "15%",
                            width: "50%",
                            marginLeft: "75%",
                            transform: "scaleX(-1) scaleY(-1)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="outer-wrapper-box b flex align-horizontal align-vertical"
                    style={{ position: "relative" }}
                  >
                    {/* MAIN CHARACTER */}
                    <div
                      style={{
                        position: "relative",
                        top: -70,
                        right: 18,
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: 40,
                          margin: "auto",
                        }}
                        className="float-y"
                      >
                        <div
                          className={`${
                            darkMode.value ? "bulb-glow" : ""
                          } bulb`}
                          style={{
                            position: "absolute",
                            left: 10,
                            top: 20,
                          }}
                        />
                        <Img
                          className="bulb"
                          loading="eager"
                          fluid={data.Bulb.childImageSharp.fluid}
                          style={{
                            position: "absolute",

                            width: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <Img
                      loading="eager"
                      fluid={data.BodyThinking.childImageSharp.fluid}
                      style={{
                        maxWidth: 200,
                        margin: "auto",
                        width: "100%",
                      }}
                    />
                  </div>
                  <div class="outer-wrapper-box c">
                    {/* RIGHT SIDE */}
                    <div
                      className="row"
                      style={{ maxWidth: 200, marginRight: "auto" }}
                    >
                      <div className="col-xs-12">
                        <Img
                          fluid={data.Ribbon11.childImageSharp.fluid}
                          className="grow-lg"
                          style={{
                            maxWidth: 65,
                            width: "35%",
                            marginRight: "auto",
                            marginLeft: "-10%",
                          }}
                        />
                      </div>
                      <div className="col-xs-12">
                        <Img
                          fluid={data.Paperclip.childImageSharp.fluid}
                          className="float-x"
                          style={{
                            maxWidth: 90,
                            marginTop: "15%",
                            marginBottom: "15%",
                            marginLeft: "10%",
                            width: "60%",
                            marginRight: "auto",
                          }}
                        />
                      </div>
                      <div className="col-xs-12 pad-1-t">
                        <Img
                          fluid={data.Ribbon4.childImageSharp.fluid}
                          className="grow-lg"
                          style={{
                            maxWidth: 70,
                            marginTop: "5%",
                            width: "50%",
                            marginLeft: "20%",
                          }}
                        />
                      </div>
                      <div className="col-xs-12">
                        <Img
                          fluid={data.iPad.childImageSharp.fluid}
                          className="float-x-slow"
                          style={{
                            maxWidth: 75,
                            marginTop: "15%",
                            marginBottom: "15%",
                            width: "50%",
                            marginLeft: "-5%",
                          }}
                        />
                      </div>
                      <div className="col-xs-12">
                        <Img
                          fluid={
                            darkMode.value
                              ? data.Ribbon10Dark.childImageSharp.fluid
                              : data.Ribbon10.childImageSharp.fluid
                          }
                          className="grow-lg"
                          style={{
                            maxWidth: 60,
                            width: "40%",
                            marginLeft: "-20%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 flex align-horizontal align-vertical text-align-center">
                <h1 className="margin-0-t margin-1-b is-hero-menu">
                  Sam Larsen-Disney
                </h1>
                <h3 className="margin-0  is-hero-sub-text">
                  {`${currentJob.role.toUpperCase()} @ `}
                  <a className="is-special-blue" href={currentJob.url}>
                    {currentJob.company.toUpperCase()}
                  </a>
                </h3>
                <AnchorLink href="#articles">
                  <h1 className="is-grey grow-lg margin-0-b margin-1-t">
                    <i class="las la-angle-down"></i>
                  </h1>
                </AnchorLink>
              </div>
            </div>
          </>
        )
      }}
    />
  )
}

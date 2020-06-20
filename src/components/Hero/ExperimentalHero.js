import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { useWindowSize } from "../../utils/customHooks"

export default ({ data }) => {
  // const size = useWindowSize()
  // if (size.width < 1325) {
  //   return <div />
  // }
  return (
    <StaticQuery
      query={graphql`
        fragment bigimage on File {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        fragment image on File {
          childImageSharp {
            fluid(maxWidth: 400) {
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
            ...image
          }
          iPad: file(relativePath: { eq: "illustration/Item/iPad.png" }) {
            ...image
          }
          LegoBrick: file(
            relativePath: { eq: "illustration/Item/LegoBrick.png" }
          ) {
            ...image
          }
          Ribbon1: file(
            relativePath: { eq: "illustration/Item/Ribbon 1.png" }
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
          Ribbon11: file(
            relativePath: { eq: "illustration/Item/Ribbon 11.png" }
          ) {
            ...image
          }
        }
      `}
      render={(data) => (
        <div className="row">
          <div className="col-xs-12 pad-3-tb">
            <div
              class="top-wrapper text-align-center"
              style={{ width: "100%", maxWidth: 1300 }}
            >
              <div class="top-wrapper-box a" />
              <div class="top-wrapper-box flex align-horizontal align-vertical ">
                {/* BULB */}
                <Img
                  fluid={data.Bulb.childImageSharp.fluid}
                  className="float-y"
                  style={{
                    maxWidth: 40,
                    marginRight: 30,
                    width: "40%",
                  }}
                />
              </div>
              <div class="top-wrapper-box c" />
            </div>
          </div>
          <div className="col-xs-12">
            <div
              class="outer-wrapper text-align-center"
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
                      fluid={data.Ribbon1.childImageSharp.fluid}
                      className="grow-lg"
                      style={{
                        maxWidth: 45,
                        width: "30%",
                        marginLeft: "auto",
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
                      }}
                    />
                  </div>
                  <div className="col-xs-12">
                    <Img
                      fluid={data.Macbook.childImageSharp.fluid}
                      className="float-y-slow"
                      style={{
                        maxWidth: 125,
                        marginTop: "5%",
                        marginBottom: "5%",
                        width: "80%",
                        marginLeft: "35%",
                      }}
                    />
                  </div>
                  <div className="col-xs-12 pad-1-t">
                    <Img
                      fluid={data.Ribbon3.childImageSharp.fluid}
                      className="grow-lg"
                      style={{
                        maxWidth: 65,
                        marginTop: "5%",
                        width: "50%",
                        marginLeft: "80%",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div class="outer-wrapper-box b">
                {/* MAIN CHARACTER */}
                <Img
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
                        width: "30%",
                        marginRight: "auto",
                      }}
                    />
                  </div>
                  <div className="col-xs-12">
                    <Img
                      fluid={data.LegoBrick.childImageSharp.fluid}
                      className="float-x"
                      style={{
                        maxWidth: 90,
                        marginTop: "15%",
                        marginBottom: "25%",
                        marginLeft: "10%",
                        width: "60%",
                        marginRight: "auto",
                      }}
                    />
                  </div>

                  <div className="col-xs-12">
                    <Img
                      fluid={data.iPad.childImageSharp.fluid}
                      className="float-x-slow"
                      style={{
                        maxWidth: 65,
                        marginTop: "3%",
                        width: "80%",
                        marginRight: "50%",
                      }}
                    />
                  </div>
                  <div className="col-xs-12 pad-1-t">
                    <Img
                      fluid={data.Ribbon4.childImageSharp.fluid}
                      className="grow-lg"
                      style={{
                        maxWidth: 70,
                        marginTop: "15%",
                        width: "50%",
                        marginLeft: "-10%",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    />
  )
}

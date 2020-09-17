import React from "react";
import { Link, graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";
import { OutboundLink } from "gatsby-plugin-google-analytics";

const Hero = () => {
  return (
    <section className="text-left text-secondary flex-1 w-full max-w-4xl px-6 pt-8 mx-auto md:px-8 md:pt-16 overflow-x-hidden md:overflow-x-visible">
      <div className="grid grid-cols-8 gap-4 w-full ">
        <div className="lg:col-span-6 md:col-span-5 col-span-8 mb-12 px-3">
          <h1 className="inline-block text-3xl sm:text-5xl md:text-5xl lg:text-6xl font-bold md:-mr-16">
            Sam Larsen-Disney
          </h1>
          <h2 className="leading-loose text-xl lg:text-2xl mb-3">
            I am a UX Engineer at American Express. I have built{" "}
            <Link className="link" to="/projects/enhanced-referral">
              new ways to refer friends
            </Link>
            ,{" "}
            <Link className="link" to="/projects/grad">
              onboarding experiences
            </Link>{" "}
            and{" "}
            <Link className="link" to="/projects/corona-support">
              rapid response systems
            </Link>
            . I enjoy teaching the next generation to code through my{" "}
            <Link className="link" to="/articles">
              articles
            </Link>
            ,{" "}
            <Link className="link" to="/presentations">
              presentations
            </Link>{" "}
            and at hackathons.
          </h2>

          <div className="text-4xl md:flex md:flex-row md:items-center ">
            <Link to="/about" className="text-base">
              <button className=" btn mr-3">About Me</button>
            </Link>
            <div className="text-5xl flex flex-wrap -mb-12 md:m-0">
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
          </div>
        </div>
        <StaticQuery
          query={graphql`
            {
              HeroBody: file(relativePath: { eq: "Body/Thinking.png" }) {
                childImageSharp {
                  fluid(maxWidth: 230) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
              HeroTorso: file(relativePath: { eq: "Torso/Thinking.png" }) {
                childImageSharp {
                  fluid(maxWidth: 230) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
              Bulb: file(relativePath: { eq: "Item/Bulb.png" }) {
                childImageSharp {
                  fluid(maxWidth: 52) {
                    ...GatsbyImageSharpFluid_noBase64
                  }
                }
              }
            }
          `}
          render={(data) => (
            <>
              <div className="col-span-2 lg:-mb-24 hidden lg:block">
                <div
                  className="w-8 ml-16 mb-16 float-y"
                  style={{ zIndex: 500 }}
                >
                  <Img fluid={data.Bulb.childImageSharp.fluid} />

                  <div className="bulb-glow ml-4 -mt-10"></div>
                </div>
                <Img
                  fluid={data.HeroBody.childImageSharp.fluid}
                  style={{ zIndex: 1000, position: "relative" }}
                />
              </div>
              <div className="col-span-8 md:col-span-3 md:mt-auto md:-ml-16 lg:-mb-24 block lg:hidden ">
                <div className="mx-auto min-w-full sm:min-w-0 -mr-32 -mt-32 sm:-mt-24 md:-mt-16  md:mt-0 md:mr-0">
                  <div className="ml-4 sm:ml-0 md:ml-2 mr-16">
                    <div
                      className="w-8 sm:w-10 md:w-8 md:ml-32 mb-16  mx-auto float-y"
                      style={{ zIndex: 500 }}
                    >
                      <Img fluid={data.Bulb.childImageSharp.fluid} />
                      <div className="bulb-glow ml-4 -mt-10"></div>
                    </div>
                  </div>
                  <Img
                    fluid={data.HeroTorso.childImageSharp.fluid}
                    className="w-1/3 sm:w-2/3 max-w-xs mx-auto sm:mb-0"
                    style={{ zIndex: 1000, position: "relative" }}
                  />
                </div>
              </div>
            </>
          )}
        />
      </div>
    </section>
  );
};

export default Hero;

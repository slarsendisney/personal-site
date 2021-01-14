import React from "react";
import { graphql, StaticQuery } from "gatsby";
import Img from "gatsby-image";

export default () => (
  <StaticQuery
    query={graphql`
      {
        HeroBody: file(relativePath: { eq: "Body/Floats.png" }) {
          childImageSharp {
            fluid(maxWidth: 230) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={(data) => (
      <div className="w-full float-y">
        <Img fluid={data.HeroBody.childImageSharp.fluid} style={{overflow:"unset"}}/>
      </div>
    )}
  />
);

import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

export default () => (
  <StaticQuery
    query={graphql`{
  HeroBody: file(relativePath: {eq: "Body/Floats.png"}) {
    childImageSharp {
      gatsbyImageData(maxWidth: 230, placeholder: NONE, layout: FLUID)
    }
  }
}
`}
    render={(data) => (
      <div className="w-full float-y">
        <GatsbyImage
          image={data.HeroBody.childImageSharp.gatsbyImageData}
          style={{overflow:"unset"}} />
      </div>
    )}
  />
);
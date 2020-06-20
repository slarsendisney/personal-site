import React from "react"
import { graphql } from "gatsby"
import { useWindowSize } from "../../utils/customHooks"

export default () => {
  const size = useWindowSize()
  if (size.width < 1325) {
  }
  return (
    <div className="row">
      <div className="col-xs-12 flex align-horizontal align-vertical">
        <div
          class="hero-wrapper text-align-center"
          style={{ width: "100%", maxWidth: 1300 }}
        >
          <div class="hero-box a"></div>
          <div class="hero-box b"></div>
          <div class="hero-box c"></div>
          <div class="hero-box d"></div>
          <div class="hero-box e" style={{ position: "relative" }}></div>
          <div class="hero-box f"></div>
          <div class="hero-box g"></div>
          <div class="hero-box h"></div>
          <div class="hero-box i"></div>
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  {
    file(relativePath: { eq: "face.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

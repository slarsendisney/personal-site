import React from "react"
import { graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BoilerPlate = ({ title, desc, flag, repo, demo }) => (
  <div className="col-xs-12 col-md-6 pad-3">
    <div
      className="pad-2 pad-3-lr is-white-bg border-radius "
      style={{ height: "100%" }}
    >
      <h1>{title}</h1>
      <h4>{desc}</h4>
      {demo && (
        <h4>
          <OutboundLink
            className="link is-pink-always"
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
          >
            See the demo!
          </OutboundLink>
        </h4>
      )}

      <h4>Get set up by typing the following command in your terminal:</h4>

      <p className="pad-3 is-grey-bg-always is-white-always border-radius">
        {`npx -p yo -p generator-sld -- yo sld:${flag}`}
      </p>

      <h4>
        Or check out the{" "}
        <OutboundLink
          className="link is-pink-always"
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
        >
          git repo
        </OutboundLink>
      </h4>
    </div>
  </div>
)
export default function Start({ data }) {
  const boilerplates = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Boilerplates" />
      <div className="is-white is-light-grey-bg">
        <div className="row container-small pad-10-t pad-3-lr">
          <div className="col-xs-12 col-md-6 ">
            <h1 className="is-hero-menu is-grey margin-0">Boilerplates</h1>
            <div className="line margin-10-t is-grey" />
            <div className="border" />
          </div>
        </div>
      </div>
      <div className="is-light-grey-bg is-grey">
        <div className="row container-small pad-5-t pad-10-b">
          {boilerplates.map((item) => (
            <BoilerPlate {...item.node.frontmatter} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "Boilerplate" } } }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            title
            desc
            demo
            flag
            repo
          }
        }
      }
    }
  }
`

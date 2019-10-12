import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BoilerPlate = ({ title, desc, flag, repo, demo }) => (
  <div className="pad-5-b">
    <h1>{title}</h1>
    <h4>{desc}</h4>
    {demo && (
      <h4>
        <a
          className="link is-pink"
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
        >
          See the demo!
        </a>
      </h4>
    )}

    <h4>Get set up by typing the following command in your terminal:</h4>
    <pre>
      <code className="pad-3 is-grey-bg is-white border-radius">
        {`npx -p yo -p generator-sld -- yo sld:${flag}`}
      </code>
    </pre>
    <h4>
      Or check out the{" "}
      <a
        className="link is-pink"
        href={repo}
        target="_blank"
        rel="noopener noreferrer"
      >
        git repo
      </a>
    </h4>
  </div>
)
export default function Start({ data }) {
  console.log({ data })
  const boilerplates = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Boilerplates" />
      <div className="is-white is-pink-bg">
        <div className="row container-small pad-20-t">
          <div className="col-xs-12 pad-10-l pad-10-r">
            <Link to="/start" className="link">
              <h2 className="is-grey margin-0 margin-2-b grow">{`< Home`}</h2>
            </Link>
          </div>
          <div className="col-xs-12 col-md-6 pad-10-l">
            <h1 className="is-hero-menu margin-0">Boilerplates</h1>
            <div className="line margin-10-t margin-10-b" />
            <div className="border" />
          </div>
        </div>
      </div>
      <div className="is-grey is-white-bg">
        <div className="row container-small pad-10-t pad-20-b">
          <div className="pad-10-l pad-10-r">
            <h2 className="">GatsbyJS Boilerplates</h2>
            {boilerplates.map(item => (
              <BoilerPlate {...item.node.frontmatter} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "BOILERPLATE" } } }
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

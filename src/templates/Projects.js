import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const Project = ({ title, desc, path, coverimg }) => (
  <Link to={path} className="link margin-15-b" id="path">
    <div className="grow row">
      <div className="col-xs-12 col-md-6 pad-2-t ">
        <Img
          fluid={coverimg.childImageSharp.fluid}
          className="shadow"
          style={{ maxHeight: 250 }}
        />
      </div>
      <div className="col-xs-12 col-md-6 pad-2-t">
        <h1 className="margin-3-b margin-0-t">{title}</h1>
        <h3 className="margin-0-t">{desc}</h3>
        <div className="line margin-5-t margin-5-b" />
      </div>
    </div>
  </Link>
)
export default ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  const [year, setYear] = useState(2019)
  let { edges } = data.allMarkdownRemark // data.markdownRemark holds our post data
  edges = edges.sort(
    (a, b) =>
      new Date(b.node.frontmatter.date) - new Date(a.node.frontmatter.date)
  )
  const years = edges.reduce((acc, curr) => {
    const year = new Date(curr.node.frontmatter.date).getFullYear()
    const idx = acc.findIndex(item => item.year === year)
    if (idx > -1) {
      acc[idx].count = acc[idx].count + 1
    } else {
      acc.push({ year, count: 1 })
    }
    return acc
  }, [])
  const articlesToDisplay = edges.filter(
    edge => new Date(edge.node.frontmatter.date).getFullYear() === year
  )
  return (
    <Layout>
      <SEO title={"Projects"} />
      <div className="is-grey is-light-grey-bg pad-10">
        <div className="row container ">
          <div className="col-xs-12 ">
            <Link to="/" className="link">
              <h2 className="is-grey margin-0 margin-2-b grow">{`< Home`}</h2>
            </Link>
          </div>
          <div className="col-xs-12 ">
            <h1 className="is-hero-menu margin-0-t">Projects</h1>
            <div className="line margin-3-t margin-10-b" />
          </div>
          <div className="col-xs-12 col-md-2">
            <div className="row">
              {years.map(item => (
                <div className="col-xs-4 col-sm-3 col-md-12" id={item.year}>
                  <button onClick={() => setYear(item.year)}>
                    <h4
                      className={`margin-0-t ${
                        item.year === year ? "is-pink-always" : "is-grey"
                      }`}
                    >{`${item.year} (${item.count})`}</h4>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-xs-12 col-md-10">
            {articlesToDisplay.map(item => (
              <Project {...item.node.frontmatter} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Projects {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "Project" } } }) {
      edges {
        node {
          id
          frontmatter {
            type
            title
            desc
            date
            path
            coverimg {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`

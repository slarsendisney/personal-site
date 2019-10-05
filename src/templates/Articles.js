import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const Article = ({ title, desc, path }) => (
  <Link to={path} className="link margin-15-b" id="path">
    <div className="grow">
      <h1 className="margin-3-b margin-0-t">{title}</h1>
      <h3 className="margin-0-t">{desc}</h3>
    </div>
  </Link>
)
export default function Articles({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const [year, setYear] = useState(2019)
  let { edges } = data.allMarkdownRemark // data.markdownRemark holds our post data
  edges = edges.sort(
    (a, b) => b.node.frontmatter.year - a.node.frontmatter.year
  )
  const years = edges.reduce((acc, curr) => {
    const year = curr.node.frontmatter.year
    const idx = acc.findIndex(item => item.year === year)
    if (idx > -1) {
      acc[idx].count = acc[idx].count + 1
    } else {
      acc.push({ year, count: 1 })
    }
    return acc
  }, [])

  const articlesToDisplay = edges.filter(
    edge => edge.node.frontmatter.year === year
  )
  return (
    <Layout>
      <SEO title={"Articles"} />
      <div className="is-grey is-light-grey-bg pad-10">
        <div className="row container ">
          <div className="col-xs-12 ">
            <Link to="/start" className="link">
              <h2 className="is-grey margin-0 margin-2-b grow">{`< Home`}</h2>
            </Link>
          </div>
          <div className="col-xs-12 ">
            <h1 className="is-hero-menu margin-0-t">I Write Occasionally.</h1>
            <div className="line margin-3-t margin-10-b" />
          </div>
          <div className="col-xs-12 col-md-2">
            <div className="row">
              {years.map(item => (
                <div className="col-xs-4 col-sm-3 col-md-12" id={item.year}>
                  <button onClick={() => setYear(item.year)}>
                    <h4
                      className={`margin-0-t ${
                        item.year === year ? "is-pink" : "is-grey"
                      }`}
                    >{`${item.year} (${item.count})`}</h4>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-xs-12 col-md-10">
            {articlesToDisplay.map(item => (
              <Article {...item.node.frontmatter} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Articles {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "Article" } } }) {
      edges {
        node {
          id
          frontmatter {
            type
            title
            desc
            year
            path
          }
        }
      }
    }
  }
`

import React, { useState, useEffect, useCallback } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Poster from "../components/poster"

export default function Articles({ data }) {
  const [index, setIndex] = useState(0)
  let { edges } = data.allNikeJson
  edges = edges.sort(
    (a, b) => new Date(b.node.start_epoch_ms) - new Date(a.node.start_epoch_ms)
  )
  const handleArrows = useCallback(
    event => {
      if (event.keyCode === 37) {
        if (index > 0) {
          setIndex(index - 1)
        }
      }
      if (event.keyCode === 39) {
        if (index < edges.length - 1) {
          setIndex(index + 1)
        }
      }
    },
    [edges, index]
  )
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleArrows)
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("keydown", handleArrows)
      }
    }
  }, [handleArrows])
  return (
    <Layout>
      <SEO title={"Run Posters"} />
      <div className="is-grey is-light-grey-bg pad-10-t pad-10-b">
        <div className="row container ">
          <div className="col-xs-12 ">
            <Link to="/runs" className="link">
              <h2 className="pad-10-l is-grey margin-0 margin-2-b grow">{`< Runs`}</h2>
            </Link>
          </div>
          <div className="col-xs-12 pad-10-l">
            <h1 className="is-hero-menu margin-0-t margin-0-b">
              Run Data Posters.
            </h1>
            <div className=" line margin-3-t margin-10-b" />
          </div>
          <div className="col-xs-2  text-align-center">
            {index > 0 && (
              <h1 className="margin-0 link" onClick={() => setIndex(index - 1)}>
                ⬅
              </h1>
            )}
          </div>
          <div className="col-xs-8  text-align-center">
            <h4>Use the left and right arrow keys to navigate.</h4>
          </div>
          <div className="col-xs-2  text-align-center">
            {index < edges.length - 1 && (
              <h1 className="margin-0 link" onClick={() => setIndex(index + 1)}>
                ➡
              </h1>
            )}
          </div>
          <div className="col-xs-12">
            <Poster {...edges[index].node} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  {
    allNikeJson {
      edges {
        node {
          start_epoch_ms
          end_epoch_ms
          summaries {
            metric
            value
          }
        }
      }
    }
  }
`

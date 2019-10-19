import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const approvedMetrics = new Set(["speed", "pace", "calories", "distance"])

const Run = ({ start_epoch_ms, end_epoch_ms, summaries }) => {
  const date = new Date(start_epoch_ms)
  const endDate = new Date(end_epoch_ms)
  return (
    <div className="margin-5-b">
      <h2 className="margin-0-t">
        {`${date.getDay() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`}
      </h2>
      <div className="row">
        <div className="col-xs-6">
          <h3 className="margin-0-t">
            start:
            <span className="is-pink-always">
              {` ${date.getHours()}:${
                date.getMinutes() > 9
                  ? date.getMinutes()
                  : `0` + date.getMinutes()
              }`}
            </span>
          </h3>
        </div>
        <div className="col-xs-6">
          <h3 className="margin-0-t">
            end:
            <span className="is-pink-always">
              {` ${endDate.getHours()}:${
                endDate.getMinutes() > 9
                  ? endDate.getMinutes()
                  : `0` + endDate.getMinutes()
              }`}
            </span>
          </h3>
        </div>
        {summaries.map(
          item =>
            approvedMetrics.has(item.metric) && (
              <>
                <div className="col-xs-6">
                  <h3 className="margin-0-t">
                    {item.metric}:
                    <span className="is-pink-always">
                      {` ${item.value.toFixed(1)}`}
                    </span>
                  </h3>
                </div>
              </>
            )
        )}
      </div>
    </div>
  )
}
export default function Articles({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const [year, setYear] = useState(2018)
  let { edges } = data.allNikeJson // data.markdownRemark holds our post data
  console.log({ edges })
  edges = edges.sort(
    (a, b) => new Date(b.node.start_epoch_ms) - new Date(a.node.start_epoch_ms)
  )
  const years = edges.reduce((acc, curr) => {
    const year = new Date(curr.node.start_epoch_ms).getFullYear()
    const idx = acc.findIndex(item => item.year === year)
    if (idx > -1) {
      acc[idx].count = acc[idx].count + 1
    } else {
      acc.push({ year, count: 1 })
    }
    return acc
  }, [])

  const runsToDisplay = edges.filter(
    edge => new Date(edge.node.start_epoch_ms).getFullYear() === year
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
            <h1 className="is-hero-menu margin-0-t">🏃‍♂️ Run. Run. Run.</h1>
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
            {runsToDisplay.map(item => (
              <Run {...item.node} />
            ))}
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

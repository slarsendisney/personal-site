import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { connect } from "react-redux"
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts"

const COLORS = ["#ea4e68", "#FE788E", "#FEB0BD", "#B43046"]

const StatCard = ({ name, nFiles, comment, code }) => {
  return (
    <div className="col-xs-6 col-md-3 is-grey">
      <h2>{name}</h2>
      <h4>{nFiles} files</h4>
      <h4>{code} lines</h4>
    </div>
  )
}

const RADIAN = Math.PI / 180
const RenderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  data,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ fontFamily: "Lato" }}
    >
      {data[index].name}
    </text>
  )
}
const Stats = ({ data, count }) => {
  const { JavaScript, Markdown, Sass, JSON, SUM } = data.statsJson
  const { totalCount } = data.allGitlogJson
  const cards = { JavaScript, Markdown, Sass, JSON }
  const statsByCodeCount = []
  const statsByFileCount = []
  Object.keys(cards).forEach((item) => {
    statsByCodeCount.push({
      name: item,
      value: cards[item].code,
    })
    statsByFileCount.push({
      name: item,
      value: cards[item].nFiles,
    })
  })
  return (
    <Layout>
      <SEO title="Stats" />
      <div className="row container pad-10-t pad-5-lr">
        <div className="col-xs-12  is-grey">
          <h1 className=" margin-2-t">
            You are{" "}
            {count > 1 ? (
              <>
                among <span className="is-pink-always">{count}</span> people{" "}
              </>
            ) : (
              <>
                {" "}
                the only <span className="is-pink-always">1</span>{" "}
              </>
            )}
            currently visiting the site. At last count, the site had had{" "}
            <span className="is-light-blue-always">2,000</span>+ visits.{" "}
          </h1>
          <h1 className=" margin-2-t">
            The latest build of this site has{" "}
            <span className="is-special-blue">{SUM.code}</span> lines of code,{" "}
            <span className="is-orange-always">{SUM.comment}</span> comments and{" "}
            <span className="is-green-always">{totalCount}</span> commits*
          </h1>

          <p>* These stats only account for code I have written myself.</p>
          <div className="line margin-5-tb" />
        </div>

        {Object.keys(cards).map(function (item) {
          return <StatCard name={item} {...cards[item]} />
        })}
        <div className="col-xs-12 col-md-6 is-grey margin-5-t">
          <h2>By Line Count</h2>
          <div style={{ height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={statsByCodeCount}
                  fill="#8884d8"
                  labelLine={false}
                  label={(e) => (
                    <RenderCustomizedLabel {...e} data={statsByCodeCount} />
                  )}
                >
                  {statsByCodeCount.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-xs-12 col-md-6 is-grey margin-5-t">
          <h2>By File Count</h2>
          <div style={{ height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={statsByFileCount}
                  fill="#8884d8"
                  labelLine={false}
                  label={(e) => (
                    <RenderCustomizedLabel {...e} data={statsByFileCount} />
                  )}
                >
                  {statsByFileCount.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allGitlogJson {
      totalCount
    }
    statsJson {
      JavaScript {
        nFiles
        comment
        code
        blank
      }
      Markdown {
        blank
        code
        comment
        nFiles
      }
      Sass {
        blank
        code
        comment
        nFiles
      }
      JSON {
        blank
        code
        comment
        nFiles
      }
      SUM {
        blank
        code
        comment
        nFiles
      }
    }
  }
`

const mapStateToProps = ({ count }) => {
  return { count }
}

const ConnectedStats =
  typeof window !== `undefined` ? connect(mapStateToProps, null)(Stats) : Stats

export default ConnectedStats

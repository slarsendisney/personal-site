import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Layout from "../components/layout"

const StatCard = ({ name, nFiles, comment, code }) => {
  return (
    <div className="col-xs-6 col-md-4  is-grey">
      <h2>{name}</h2>
      <h4>{nFiles} files</h4>
      <h4>{code} lines of code</h4>
    </div>
  )
}
export default ({ data }) => {
  const { JavaScript, Markdown, Sass, SUM } = data.statsJson
  const cards = { JavaScript, Markdown, Sass }
  return (
    <Layout>
      <SEO title="Stats" />
      <div className="row container pad-10-t pad-5-lr">
        <div className="col-xs-12 pad-10-b">
          <h1 className="is-hero-sub-menu is-grey margin-0 ">Site Stats</h1>

          <h1 className="is-hero-menu is-grey margin-2-t">
            <span className="is-pink-always">sld.codes</span>' latest build has{" "}
            <span className="is-special-blue">{SUM.code}</span> lines of code,{" "}
            <span className="is-orange-always">{SUM.comment}</span> comments and{" "}
            <span className="is-green-always">{SUM.blank}</span> blank lines.
          </h1>
          <div className="line is-grey" />
        </div>
        {Object.keys(cards).map(function (item) {
          return <StatCard name={item} {...cards[item]} />
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
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
      SUM {
        blank
        code
        comment
        nFiles
      }
    }
  }
`

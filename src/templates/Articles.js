import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const Article = ({ title, pubDate, link }) => (
  <Link to={link} className="link margin-10-b" id="path">
    <div className="grow">
      <h1 className="margin-3-b margin-0-t is-dark-blue">{title}</h1>
      <h3 className="margin-0-t margin-5-b">
        {pubDate.replace(
          /([0-9])([0-9]):([0-9])([0-9]):([0-9])([0-9]) ([A-Z])([A-Z])([A-Z])/g,
          ""
        )}
      </h3>
    </div>
  </Link>
)
export default ({ data }) => {
  let { nodes } = data.allFeedMediumBlog

  return (
    <Layout>
      <SEO
        title="Articles"
        description="✍️ I Write Occasionally. I hope you find something useful!"
      />
      <div className="is-grey is-light-grey-bg pad-10">
        <div className="row container ">
          <div className="col-xs-12 ">
            <Link to="/" className="link">
              <h2 className="is-grey margin-0 margin-2-b grow">{`< Home`}</h2>
            </Link>
          </div>
          <div className="col-xs-12 ">
            <h1 className="is-hero-menu margin-0-t">I Write Occasionally.</h1>
            <div className="line margin-3-t margin-10-b" />
          </div>
          {/* <div className="col-xs-12 col-md-2">
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
              <div className="col-xs-4 col-sm-3 col-md-12" id="rss-feed">
                <a
                  href="/rss.xml"
                  target="_blank"
                  style={{ textDecoration: "none" }}
                >
                  <h4 className={`margin-0-t link is-orange-always`}>
                    RSS Feed
                  </h4>
                </a>
              </div>
            </div>
          </div> */}
          <div className="col-xs-12 col-md-10">
            {nodes.map(item => (
              <Article {...item} link={item.fields.slug} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Articles {
    allFeedMediumBlog(sort: { fields: isoDate, order: DESC }) {
      nodes {
        fields {
          slug
        }
        pubDate
        title
      }
    }
  }
`

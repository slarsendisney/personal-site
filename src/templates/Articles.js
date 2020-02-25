import React from "react"
import { Link, graphql } from "gatsby"
import { format } from "date-fns"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Subscribe from "../components/Articles/Subscribe"

export const Article = ({ title, pubDate, link }) => (
  <Link to={"/" + link} className="link margin-10-b" id="path">
    <div className="grow">
      <h1 className="margin-3-b margin-0-t is-dark-blue">{title}</h1>
      <h3 className="margin-0-t margin-5-b">
        {format(new Date(pubDate), "iii, dd MMM yyyy")}
      </h3>
    </div>
  </Link>
)
const LegacyArticle = ({ title, path, date }) => (
  <Link to={path} className="link margin-15-b" id="path">
    <div className="grow">
      <h1 className="margin-3-b margin-0-t is-dark-blue">{title}</h1>
      <h3 className="margin-0-t margin-5-b">
        {format(new Date(date), "iii, dd MMM yyyy")}
      </h3>
    </div>
  </Link>
)

export default ({ data }) => {
  let { nodes } = data.allFeedMediumBlog
  let { edges } = data.allMarkdownRemark
  return (
    <Layout>
      <SEO
        title="Articles"
        description="✍️ I Write Occasionally. I hope you find something useful!"
      />
      <div className="is-grey is-light-grey-bg pad-10-tb pad-5-lr">
        <div className="row container ">
          <div className="col-xs-12 ">
            <h1 className="is-hero-menu margin-0-t">I Write Occasionally.</h1>
            <div className="line margin-3-t margin-10-b" />
          </div>

          <div className="col-xs-12 ">
            <h3 className="margin-0-t is-light-blue-always">From Medium:</h3>
          </div>
          <div className="col-xs-12 col-md-10">
            {nodes.map(item => (
              <Article
                {...item}
                link={item.fields.slug}
                key={item.fields.slug}
              />
            ))}
          </div>
          <div className="col-xs-12 margin-5-t">
            <h3 className="margin-0-t is-light-blue-always">Legacy Posts:</h3>
          </div>
          <div className="col-xs-12 col-md-10">
            {edges.map(item => (
              <LegacyArticle
                {...item.node.frontmatter}
                timeToRead={item.node.timeToRead}
                key={item.node.frontmatter.title}
              />
            ))}
          </div>
          <div className="col-xs-12 margin-5-t">
            <div className="line-sm margin-5-tb" />
            <Subscribe />
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
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "Article" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          timeToRead
          frontmatter {
            type
            title
            desc
            path
            date
          }
        }
      }
    }
  }
`

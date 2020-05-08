import React from "react"
import { Link, graphql } from "gatsby"
import { format } from "date-fns"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Subscribe from "../components/Articles/Subscribe"
import compareAsc from "date-fns/compareAsc"
import Graceful from "react-graceful-image"

export const Article = ({
  title,
  pubDate,
  slug,
  hero_img,
  coverimg,
  excerpt,
}) => (
  <Link to={"/" + slug} className="link" id="path">
    <div className="grow row margin-5-b">
      <div className="col-xs-12 col-md-6 margin-5-t ">
        {hero_img ? (
          <img
            src={hero_img}
            alt="hero-img"
            className="shadow"
            style={{ width: "100%", height: 250, objectFit: "cover" }}
          />
        ) : (
          <Img
            fluid={coverimg.childImageSharp.fluid}
            className="shadow"
            style={{ maxHeight: 250 }}
          />
        )}
      </div>
      <div className="col-xs-12 col-md-6 margin-5-t">
        <h1 className="margin-0 is-dark-blue">{title}</h1>
        <p className="margin-0 margin-2-b is-dark-blue">
          {format(new Date(pubDate), "iii, dd MMM yyyy")}
        </p>

        <p className="margin-0 is-dark-blue">{excerpt}</p>
      </div>
    </div>
  </Link>
)
export const ArticlePreview = ({ title, pubDate, slug, hero_img, excerpt }) => (
  <Link to={"/" + slug} className="link" id="path">
    <div className="grow row margin-5-b">
      <div className="col-xs-12  margin-5-t ">
        <Graceful
          alt="hero-img"
          src={hero_img}
          className="shadow"
          style={{ width: "100%", height: 250, objectFit: "cover" }}
        />
      </div>
      <div className="col-xs-12  margin-5-t">
        <h1 className="margin-0 is-dark-blue">{title}</h1>
        <p className="margin-0 margin-2-b is-dark-blue">
          {format(new Date(pubDate), "iii, dd MMM yyyy")}
        </p>

        <p className="margin-0 is-dark-blue">{excerpt}</p>
      </div>
    </div>
  </Link>
)
const LegacyArticle = ({ title, path, date }) => (
  <Link to={path} className="link margin-15-b" id="path">
    <div className="grow row">
      <div className="col-xs-12">
        <h1 className="margin-2-b margin-0-t is-dark-blue">{title}</h1>
      </div>
      <div className="col-xs-12">
        <h3 className="margin-0-t margin-8-b">
          {format(new Date(date), "iii, dd MMM yyyy")}
        </h3>
      </div>
    </div>
  </Link>
)

export default ({ data }) => {
  let { nodes } = data.allFeedMediumBlog
  let { edges } = data.allMarkdownRemark
  let mdxEdges = data.allMdx.edges.map((item) => ({
    ...item.node,
    ...item.node.fields,
    ...item.node.frontmatter,
    pubDate: item.node.frontmatter.date,
    excerpt: item.node.frontmatter.desc,
  }))
  // just add ...mdxEdges below
  let allArticles = [...nodes].sort((a, b) =>
    compareAsc(new Date(b.pubDate), new Date(a.pubDate))
  )

  return (
    <Layout>
      <SEO
        title="Articles"
        description="✍️ I Write Occasionally. I hope you find something useful!"
      />
      <div className="is-grey is-light-grey-bg pad-10-tb pad-3-lr">
        <div className="row container ">
          <div className="col-xs-12 ">
            <h1 className="is-hero-menu margin-10-t margin-1-l margin-3-b">
              I Write Occasionally.
            </h1>
            <div className="line margin-5-b  margin-1-l" />
          </div>

          <div className="col-xs-12 col-md-10">
            {allArticles.map((item) => (
              <Article {...item} {...item.fields} key={item.fields.slug} />
            ))}
          </div>
          <div className="col-xs-12 margin-5-t">
            <h2 className="margin-0-t is-special-blue">Legacy Posts:</h2>
          </div>
          <div className="col-xs-12 col-md-10">
            {edges.map((item) => (
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
          hero_img
          excerpt
        }
        pubDate
        title
      }
    }
    allMdx(filter: { frontmatter: { type: { eq: "Article" } } }) {
      edges {
        node {
          frontmatter {
            title
            date
            desc
            coverimg {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
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

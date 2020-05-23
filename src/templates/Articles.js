import React from "react"
import { Link, graphql, navigate } from "gatsby"
import { format } from "date-fns"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Subscribe from "../components/Articles/Subscribe"
import compareAsc from "date-fns/compareAsc"
import StickyArticleSideBar from "../components/Articles/StickyArticleSideBar"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

let pathToTitle = (path) => {
  let clean = path
    .replace("/articles/", "")
    .split("/")
    .join("")
    .split("-")
    .join(" ")
  return clean.replace(
    /((?:^|\.)\w|\b(?!(?:a|amid|an|and|anti|as|at|but|but|by|by|down|for|for|for|from|from|in|into|like|near|nor|of|of|off|on|on|onto|or|over|past|per|plus|save|so|than|the|to|to|up|upon|via|with|without|yet)\b)\w)/g,
    function (character) {
      return character.toUpperCase()
    }
  )
}

export const Article = ({
  title,
  pubDate,
  slug,
  hero_img,
  placeholder_img,
  coverimg,
  excerpt,
}) => (
  <Link to={"/" + slug} className="link" id="path">
    <div className="grow row margin-3-t margin-5-b">
      <div className="col-xs-12 col-sm-5 col-md-5 margin-2-b">
        {hero_img ? (
          <LazyLoadImage
            alt={title}
            effect="blur"
            className="shadow"
            style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
            src={hero_img}
            placeholderSrc={placeholder_img}
          />
        ) : (
          <Img
            fluid={coverimg.childImageSharp.fluid}
            className="shadow"
            style={{ width: "100%", maxHeight: 200 }}
          />
        )}
      </div>
      <div className="col-xs-12 col-sm-7 col-md-7">
        <h2 className="margin-0 is-dark-blue">{title}</h2>
        <p className="margin-0 margin-2-b is-dark-blue">
          {format(new Date(pubDate), "iii, dd MMM yyyy")}
        </p>

        <p className="margin-0 is-dark-blue">{excerpt}</p>
      </div>
    </div>
  </Link>
)
export const ArticlePreview = ({
  title,
  pubDate,
  slug,
  hero_img,
  placeholder_img,
  excerpt,
}) => (
  <Link to={"/" + slug} className="link" id="path">
    <div className="grow row margin-5-b">
      <div className="col-xs-12  margin-5-t ">
        <LazyLoadImage
          alt={title}
          effect="blur"
          className="shadow"
          style={{ width: "100%", height: 250, objectFit: "cover" }}
          src={hero_img}
          placeholderSrc={placeholder_img}
        />
      </div>
      <div className="col-xs-12  margin-5-t">
        <h2 className="margin-0 is-dark-blue">{title}</h2>
        <p className="margin-0 margin-2-b is-dark-blue">
          {format(new Date(pubDate), "iii, dd MMM yyyy")}
        </p>

        <p className="margin-0 is-dark-blue">{excerpt}</p>
      </div>
    </div>
  </Link>
)

export default ({ data }) => {
  let { nodes } = data.allFeedMediumBlog
  let popular = data.allPageViews
  let mdxEdges = data.allMdx.edges.map((item) => ({
    ...item.node,
    ...item.node.fields,
    ...item.node.frontmatter,
    pubDate: item.node.frontmatter.date,
    excerpt: item.node.frontmatter.desc,
  }))
  let mdEdges = data.allMarkdownRemark.edges.map((item) => ({
    ...item.node,
    ...item.node.fields,
    ...item.node.frontmatter,
    fields: {
      slug: item.node.frontmatter.path,
    },
    pubDate: item.node.frontmatter.date,
    excerpt: item.node.frontmatter.desc,
  }))
  // just add ...mdxEdges below
  let allArticles = [...nodes, ...mdxEdges, ...mdEdges].sort((a, b) =>
    compareAsc(new Date(b.pubDate), new Date(a.pubDate))
  )
  return (
    <Layout>
      <SEO
        title="Articles"
        description="✍️ I Write Occasionally. I hope you find something useful!"
      />
      <div className="is-grey is-light-grey-bg pad-5-t">
        <div className="row container-small ">
          <div className="col-xs-12 pad-3-lr">
            {/* <h1 className="margin-1-tb margin-1-l">
              The Ramblings of a Curious Engineer.
            </h1> */}
          </div>
          <div className="col-xs-12 col-md-9 col-lg-9 pad-3-lr">
            <h3 className="  margin-1-l margin-0-b">RECENTLY PUBLISHED</h3>
            {allArticles.map((item) => (
              <Article {...item} {...item.fields} key={item.fields.slug} />
            ))}
          </div>
          <div className="col-xs-12 col-md-3 col-lg-3 pad-3-l">
            <StickyArticleSideBar>
              {/* <h3 className="margin-0-b">TOP CATEGORIES</h3> */}
              <h3 className="margin-0-b">POPULAR CONTENT</h3>
              {popular.edges.map((item) => (
                <div style={{ maxWidth: 250 }}>
                  <Link to={item.node.path} className="is-special-blue">
                    <p className="">{pathToTitle(item.node.path)}</p>
                  </Link>
                </div>
              ))}
              <h3 className="margin-0-b margin-5-t">FEELING LUCKY?</h3>
              <button
                onClick={() =>
                  navigate(
                    "/" +
                      allArticles[
                        Math.floor(Math.random() * allArticles.length)
                      ].fields.slug
                  )
                }
              >
                <p className="is-special-blue">See A Random Article</p>
              </button>
            </StickyArticleSideBar>
          </div>

          <div className="col-xs-12 margin-5-t margin-10-b">
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
          placeholder_img
          excerpt
        }
        pubDate
        title
      }
    }
    allPageViews(
      filter: { path: { regex: "//articles/[^?/]*$/g" } }
      sort: { fields: totalCount, order: DESC }
      limit: 8
    ) {
      edges {
        node {
          totalCount
          path
        }
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

import React from "react"
import { Link, graphql } from "gatsby"
import { format } from "date-fns"
import Img from "gatsby-image/withIEPolyfill"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Subscribe from "../components/Articles/Subscribe"
import StickyArticleSideBar from "../components/Articles/StickyArticleSideBar"
import getAllArticles from "../utils/getAllArticles"
import FeatureBadge from "../components/Articles/FeatureBadge"
import { kebabCase } from "lodash"
import { MaxStickyBarWidth } from "../utils/customHooks"

export const pathToTitle = (path) => {
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

export const createTagGroup = (tags) =>
  tags.map((tag) => (
    <Link to={`/articles/tags/${kebabCase(tag)}`}>
      <p className="article-tag  margin-1-tb margin-1-r">{tag.toUpperCase()}</p>
    </Link>
  ))

export const Article = ({
  title,
  pubDate,
  slug,
  coverimg,
  featured,
  excerpt,
  key,
  tags,
}) => {
  return (
    <Link to={slug} className="link" id={key}>
      <div className="row margin-3-t margin-5-b pad-0">
        <div
          className="col-xs-12 col-md-5 margin-2-b"
          style={{ position: "relative" }}
        >
          {featured && (
            <div
              style={{
                position: "absolute",
                bottom: 3,
                right: 12,
                zIndex: 100,
                height: 30,
                width: 30,
              }}
            >
              <FeatureBadge feature={featured} link={false} />
            </div>
          )}
          <Img
            fluid={coverimg.childImageSharp.fluid}
            className="shadow"
            objectFit="cover"
            style={{ width: "100%", height: "100%", maxHeight: 220 }}
          />
        </div>
        <div className="col-xs-12 col-md-7">
          <h2 className="margin-0 is-grey">{title}</h2>
          <p className="margin-0 margin-2-b is-grey">
            {format(new Date(pubDate), "iii, dd MMM yyyy")}
          </p>
          <p className="margin-0 is-grey margin-1-tb">{excerpt}</p>
          <div className="flex flex-wrap">{createTagGroup(tags)}</div>
        </div>
      </div>
    </Link>
  )
}
export const ArticlePreview = ({
  title,
  pubDate,
  slug,
  coverimg,
  featured,
  tags,
  excerpt,
}) => (
  <Link to={slug} className="link" id="path">
    <div className="grow row margin-5-b">
      <div className="col-xs-12  margin-5-t " style={{ position: "relative" }}>
        {featured && (
          <div
            style={{
              position: "absolute",
              bottom: 3,
              right: 12,
              zIndex: 100,
              height: 30,
              width: 30,
            }}
          >
            <FeatureBadge feature={featured} link={false} />
          </div>
        )}
        <Img
          fluid={coverimg.childImageSharp.fluid}
          className="shadow"
          objectFit="cover"
          style={{ width: "100%", height: "100%", maxHeight: 250 }}
        />
      </div>
      <div className="col-xs-12  margin-3-t">
        <h2 className="margin-0 is-grey">{title}</h2>
        <p className="margin-0 margin-2-b is-grey">
          {format(new Date(pubDate), "iii, dd MMM yyyy")}
        </p>
        <p className="margin-0 is-grey margin-1-tb">{excerpt}</p>
        <div className="flex flex-wrap">{createTagGroup(tags)}</div>
      </div>
    </div>
  </Link>
)

export default ({ data }) => {
  const { currentPage, numPages } = data.sitePage.context
  const maxWidth = MaxStickyBarWidth()
  const allArticles = getAllArticles(data)
  const popular = data.allPageViews.edges.filter(
    (item) => !/\/articles\/\d$/g.test(item.node.path)
  )
  const tags = data.tags.group
    .sort((a, b) => b.totalCount - a.totalCount)
    .slice(0, 10)
    .map((item) => item.tag)
  return (
    <Layout>
      <SEO
        title="Articles"
        description="✍️ I Write Occasionally. I hope you find something useful!"
      />
      <div className="is-grey is-light-grey-bg pad-5-t">
        <div className="row container-small ">
          <div className="col-xs-12 col-md-9">
            <h3 className=" margin-1-l margin-0-b" style={{ lineHeight: 1.5 }}>
              RECENTLY PUBLISHED
            </h3>
            {allArticles.map((item) => (
              <div className="grow">
                <Article {...item} {...item.fields} key={item.fields.slug} />
              </div>
            ))}
            <div
              className="flex margin-5-b"
              style={{ justifyContent: "center" }}
            >
              {Array.from({ length: 5 }, (v, k) => k + 1).map(
                (item) =>
                  item <= numPages && (
                    <Link to={item === 1 ? `/articles/` : `/articles/${item}`}>
                      <div
                        className={`${
                          item === currentPage
                            ? "is-special-blue-bg is-white "
                            : " is-grey-bg is-white "
                        } pad-2-lr pad-1-tb margin-1  grow border-radius-sm`}
                      >
                        <h3 className="margin-0">{item}</h3>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </div>

          <div
            className="col-xs-12 col-md-3  pad-3-l"
            style={{ position: "relative" }}
          >
            <StickyArticleSideBar>
              <div
                className="row pad-3-r"
                style={{ maxWidth: maxWidth, width: "100%" }}
              >
                <div className="col-xs-12 col-sm-6 col-md-12">
                  <h3 className="margin-0-b">POPULAR CONTENT</h3>
                  {popular.map((item) => (
                    <div>
                      <Link to={item.node.path} className="is-special-blue">
                        <p className="">{pathToTitle(item.node.path)}</p>
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="col-xs-12 col-sm-6 col-md-12">
                  <h3 className="margin-0-b">TOP TAGS</h3>
                  <div className="flex flex-wrap margin-3-tb">
                    {createTagGroup(tags)}
                  </div>
                </div>
              </div>
            </StickyArticleSideBar>
          </div>

          <div className="col-md-9 pad-0 margin-10-b ">
            <div className="line-sm margin-1-t margin-3-b margin-5-lr opacity-10" />

            <Subscribe />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Articles($skip: Int!, $limit: Int!, $slug: String!) {
    sitePage(path: { eq: $slug }) {
      context {
        limit
        skip
        numPages
        currentPage
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
    tags: allMdx(filter: { frontmatter: { type: { eq: "Article" } } }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
    allMdx(
      limit: $limit
      skip: $skip
      filter: { frontmatter: { type: { eq: "Article" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            desc
            path
            featured
            tags
            coverimg {
              childImageSharp {
                fluid(maxWidth: 400) {
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
  }
`

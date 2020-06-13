import React from "react"
import { Link, graphql } from "gatsby"
import parse from "date-fns/parse"
import compareAsc from "date-fns/compareAsc"
import Img from "gatsby-image/withIEPolyfill"
import { kebabCase } from "lodash"
import Layout from "../components/layout"
import SEO from "../components/seo"

export const createTagGroup = (tags) =>
  tags.map((tag) => (
    <Link to={`/projects/tags/${kebabCase(tag)}`}>
      <p className="project-tag  margin-1-tb margin-1-r">{tag.toUpperCase()}</p>
    </Link>
  ))

export const ProjectPreview = ({ title, desc, path, coverimg, tags }) => (
  <div className="pad-5-b">
    <Link to={path} className="link " id="path">
      <div className="grow row">
        <div className="col-xs-12 pad-2-t ">
          <Img
            fluid={coverimg.childImageSharp.fluid}
            className="shadow"
            objectFit="cover"
            style={{ width: "100%", height: "100%", maxHeight: 220 }}
          />
        </div>
        <div className="col-xs-12 pad-6-t is-grey">
          <h2 className="margin-0 is-grey">{title}</h2>
          <p className="margin-1-tb">{desc}</p>
          <div className="flex flex-wrap">{createTagGroup(tags)}</div>
        </div>
      </div>
    </Link>
  </div>
)

export const Project = ({ title, desc, path, coverimg, tags }) => (
  <div className="col-xs-12 col-sm-6 pad-5-b">
    <Link to={path} className="link " id="path">
      <div className="grow row">
        <div className="col-xs-12 col-md-6  margin-3-t">
          <Img
            fluid={coverimg.childImageSharp.fluid}
            className="shadow"
            objectFit="cover"
            style={{ width: "100%", height: "100%", maxHeight: 220 }}
          />
        </div>
        <div className="col-xs-12 col-md-6  margin-3-t is-grey">
          <h2 className="margin-1-b margin-0-t">{title}</h2>
          <p className="margin-0-t margin-1-b">{desc}</p>
          <div className="flex flex-wrap">{createTagGroup(tags)}</div>
        </div>
      </div>
    </Link>
  </div>
)

export default ({
  data, // this prop will be injected by the GraphQL query below.
}) => {
  let { edges } = data.allMdx // data.markdownRemark holds our post data

  return (
    <Layout>
      <SEO title={"Projects"} />

      <div className="is-grey pad-5-t container-small row ">
        <div className="col-xs-12 pad-3-lr">
          <h3 className="margin-0-b margin-1-l" style={{ lineHeight: 1.5 }}>
            PROJECTS
          </h3>
        </div>

        <div className="row">
          {edges
            .sort((a, b) => {
              var resultA = parse(
                a.node.frontmatter.date,
                "yyyy-MM-dd",
                new Date()
              )
              var resultB = parse(
                b.node.frontmatter.date,
                "yyyy-MM-dd",
                new Date()
              )
              return compareAsc(resultB, resultA)
            })
            .map((item) => (
              <Project
                {...item.node.frontmatter}
                key={item.node.frontmatter.title}
              />
            ))}
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query Projects {
    allMdx(filter: { frontmatter: { type: { eq: "Project" } } }) {
      edges {
        node {
          id
          frontmatter {
            type
            title
            desc
            tags
            date
            path
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

import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { format } from "date-fns"
import VisibilitySensor from "react-visibility-sensor"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleShareOptions from "../components/Articles/ArticleShareOptions"
import ReadingProgress from "../components/Articles/ReadingProgress"
import Like from "../components/Articles/StickyLike"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"
import FeatureBadge from "../components/Articles/FeatureBadge"
import JoinAudience from "../components/Articles/JoinAudience"
import TableOfContents from "../components/Articles/TableOfContents"

const CodeBlock = (props) => (
  <SyntaxHighlighter
    style={atomOneDark}
    wrapLines
    customStyle={{
      padding: 10,
      paddingTop: 15,
      paddingBottom: 0,
      borderRadius: 5,
      margin: 0,
    }}
    showLineNumbers
    lineNumberContainerProps={{
      style: { opacity: 0.5, float: "left", paddingRight: "10px" },
    }}
    {...props}
  />
)

export default ({ data, location }) => {
  const { mdx } = data
  const { title, date, desc, coverimg, declutter, featured } = mdx.frontmatter
  const { articlePage } = data.sitePage.context
  const target = React.createRef()
  const [currentHeading, setCurrentHeading] = useState("")

  useEffect(() => {
    if (mdx.tableOfContents.items) {
      setCurrentHeading(mdx.tableOfContents.items[0].title)
    }
  }, [])
  function onChange(isVisible, name) {
    if (isVisible) {
      setCurrentHeading(name)
    }
  }

  const VisWatcher = ({ children, name }) => {
    return (
      <VisibilitySensor onChange={(e) => onChange(e, name)}>
        {children}
      </VisibilitySensor>
    )
  }
  const Heading = (props) => {
    const CustomTag = `h${props.priority}`
    return (
      <VisWatcher name={props.children}>
        <CustomTag {...props}>{props.children}</CustomTag>
      </VisWatcher>
    )
  }

  const components = {
    code: CodeBlock,
    h1: (e) => <Heading {...e} priority={1} />,
    h2: (e) => <Heading {...e} priority={2} />,
    h3: (e) => <Heading {...e} priority={3} />,
    h4: (e) => <Heading {...e} priority={4} />,
    h5: (e) => <Heading {...e} priority={5} />,
    h6: (e) => <Heading {...e} priority={6} />,
  }

  return (
    <Layout>
      <SEO
        title={title}
        description={desc}
        location={location}
        image={"https://sld.codes" + coverimg.childImageSharp.fluid.src}
      />
      <JoinAudience />
      <ReadingProgress target={target} />
      <div className="is-black is-light-grey-bg">
        <div
          className={`row ${
            declutter ? "container" : "container-article"
          } pad-10-t `}
          ref={target}
        >
          <div className="col-xs-12 pad-3-lr">
            <Link
              to={
                articlePage === 0 ? "/articles" : `/articles/${articlePage + 1}`
              }
              className=""
            >
              <h3 className="is-black margin-0 margin-2-b link-bar pad-1-b">
                {" "}
                <i class="las la-arrow-left"></i>
                {` ARTICLES`}
              </h3>
            </Link>
          </div>

          <div className="col-xs-12 pad-3-lr">
            <h1 className="is-hero-menu is-black margin-1-t margin-3-b">
              {title}
            </h1>
            <div className="flex align-horizontal margin-3-b">
              {featured && (
                <div style={{ height: 40, width: 40 }} className="margin-2-r">
                  <FeatureBadge feature={featured} link={true} />
                </div>
              )}

              <h6 className="is-hero-sub-text margin-0">
                {format(new Date(date), "iii, dd MMM yyyy")}{" "}
              </h6>
            </div>
            <div className="line margin-5-b margin-3-t" />

            <div className={`pad-3-b lato ${!declutter ? "article" : ""}`}>
              <MDXProvider components={components}>
                <MDXRenderer>{mdx.body}</MDXRenderer>
              </MDXProvider>
            </div>
          </div>
          <div className="col-xs-12 pad-3-lr pad-5-b">
            <Like />
          </div>
          {!declutter && (
            <div className="col-xs-12">
              <TableOfContents
                tableOfContents={mdx.tableOfContents}
                currentHeading={currentHeading}
              />
            </div>
          )}

          <div className="col-xs-12 pad-3-lr pad-5-b">
            <ArticleShareOptions location={location} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    sitePage(path: { eq: $slug }) {
      context {
        slug
        articlePage
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      body
      tableOfContents
      frontmatter {
        title
        desc
        date
        declutter
        featured
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
`

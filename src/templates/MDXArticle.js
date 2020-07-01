import React from "react"
import { Link, graphql } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { format } from "date-fns"
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
const components = {
  code: CodeBlock,
}

export default ({ data, location }) => {
  const { mdx } = data
  const { title, date, desc, coverimg, declutter, featured } = mdx.frontmatter
  const { articlePage } = data.sitePage.context
  const target = React.createRef()
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
      <div className="is-grey is-light-grey-bg">
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
              <h3 className="is-grey margin-0 margin-2-b link-bar pad-1-b">
                {" "}
                <i class="las la-arrow-left"></i>
                {` ARTICLES`}
              </h3>
            </Link>
          </div>

          <div className="col-xs-12 pad-3-lr">
            <h1 className="is-hero-menu is-grey margin-1-t margin-3-b">
              {title}
            </h1>
            <div className="flex align-horizontal margin-3-b">
              {featured && (
                <div style={{ height: 25, width: 25 }} className="margin-1-r">
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
              <TableOfContents tableOfContents={mdx.tableOfContents} />
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

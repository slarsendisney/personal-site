import React from "react"
import { Link, graphql } from "gatsby"
import { format } from "date-fns"
import ReactHtmlParser from "react-html-parser"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ArticleShareOptions from "../components/Articles/ArticleShareOptions"
import ReadingProgress from "../components/Articles/ReadingProgress"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"

function transform(node) {
  if (node.type === "tag" && node.name === "img") {
    console.log(node.attribs.src)
    return (
      <LazyLoadImage
        alt="progressive-image"
        effect="blur"
        src={node.attribs.src}
      />
    )
  }
  if (node.type === "tag" && node.name === "a") {
    if (node.attribs.href.includes("https://sld.codes")) {
      return (
        <Link to={node.attribs.href.replace("https://sld.codes", "")}>
          {node.children[0].data}
        </Link>
      )
    }
  }
}

export default ({ data, location }) => {
  const { feedMediumBlog } = data
  const { title, content, pubDate, fields } = feedMediumBlog
  const target = React.createRef()
  return (
    <Layout>
      <SEO title={title} description={fields.excerpt} image={fields.hero_img} />
      <ReadingProgress target={target} />
      <div className="is-grey is-light-grey-bg">
        <div className="row container pad-10-t " ref={target}>
          <div className="col-xs-12 pad-5-lr">
            <Link to="/articles" className="">
              <h2 className="is-grey margin-0 margin-2-b link-bar pad-1-b">{`< Articles`}</h2>
            </Link>
          </div>

          <div className="col-xs-12 pad-5-lr">
            <h1 className="is-hero-menu is-grey margin-1-t margin-5-b">
              {title}
            </h1>
            <h6 className="is-hero-sub-text margin-3-b">
              {format(new Date(pubDate), "iii, dd MMM yyyy")}
            </h6>
            <div className="line margin-5-tb" />
            <div className="lato article">
              {ReactHtmlParser(content.encoded, { transform })}
            </div>
          </div>
          <div className="col-xs-12 pad-5-lr pad-5-b">
            <ArticleShareOptions location={location} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    feedMediumBlog(fields: { slug: { eq: $slug } }) {
      link
      title
      pubDate
      fields {
        excerpt
        hero_img
      }
      content {
        encoded
      }
    }
  }
`

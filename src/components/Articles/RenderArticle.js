import React from "react"
import ReactHtmlParser from "react-html-parser"
import { Link } from "gatsby"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

function transform(node) {
  if (node.type === "tag" && node.name === "img") {
    return (
      <LazyLoadImage
        alt="progressive-image"
        effect="blur"
        src={node.attribs.src}
        placeholderSrc={node.attribs.src.replace(/\/max\/\d*/, "/max/256")}
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
  if (node.type === "tag" && node.name === "pre") {
    const code =
      node.children[0].name === "code"
        ? node.children[0].children[0].data
        : node.children
            .reduce((acc, cur) => {
              acc.push(cur.data)
              return acc
            }, [])
            .join("\n")

    return (
      <SyntaxHighlighter
        style={atomOneDark}
        wrapLines
        customStyle={{
          padding: 10,
          paddingTop: 15,
          paddingBottom: 15,
          borderRadius: 5,
        }}
        showLineNumbers
        lineNumberContainerProps={{
          style: { opacity: 0.5, float: "left", paddingRight: "10px" },
        }}
      >
        {code}
      </SyntaxHighlighter>
    )
  }
}

function transformLazyImages(node) {
  if (node.type === "tag" && node.name === "img") {
    return (
      <LazyLoadImage
        alt="progressive-image"
        effect="blur"
        src={node.attribs.src}
        placeholderSrc={node.attribs.src.replace(/\/max\/\d*/, "/max/256")}
      />
    )
  }
}

export default ({ content, lazyLoadImage }) => {
  if (lazyLoadImage) {
    return (
      <div className="article">
        {ReactHtmlParser(content, { transform, transformLazyImages })}
      </div>
    )
  }
  return (
    <div className="article">{ReactHtmlParser(content, { transform })}</div>
  )
}

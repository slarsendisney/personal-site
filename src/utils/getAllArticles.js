import compareAsc from "date-fns/compareAsc"

export default (data) => {
  let mediumEdges = data.allFeedMediumBlog ? data.allFeedMediumBlog.nodes : []
  let mdxEdges = data.allMdx
    ? data.allMdx.edges.map((item) => ({
        ...item.node,
        ...item.node.fields,
        ...item.node.frontmatter,
        pubDate: item.node.frontmatter.date,
        excerpt: item.node.frontmatter.desc,
      }))
    : []
  let mdEdges = data.allMarkdownRemark
    ? data.allMarkdownRemark.edges.map((item) => ({
        ...item.node,
        ...item.node.fields,
        ...item.node.frontmatter,
        fields: {
          slug: item.node.frontmatter.path,
        },
        pubDate: item.node.frontmatter.date,
        excerpt: item.node.frontmatter.desc,
      }))
    : []
  let allArticles = [...mediumEdges, ...mdxEdges, ...mdEdges].sort((a, b) =>
    compareAsc(new Date(b.pubDate), new Date(a.pubDate))
  )
  return allArticles
}

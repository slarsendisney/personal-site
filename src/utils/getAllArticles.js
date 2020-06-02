import compareAsc from "date-fns/compareAsc"

export default (data) => {
  let mdxEdges = data.allMdx
    ? data.allMdx.edges.map((item) => ({
        ...item.node,
        ...item.node.fields,
        ...item.node.frontmatter,
        pubDate: item.node.frontmatter.date,
        excerpt: item.node.frontmatter.desc,
      }))
    : []

  let allArticles = [...mdxEdges].sort((a, b) =>
    compareAsc(new Date(b.pubDate), new Date(a.pubDate))
  )
  return allArticles
}

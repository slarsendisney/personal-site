import React from "react"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Deck from "../components/deck"
import splitSlides from "../split-slides"
import SEO from "../components/seo"

export const pageQuery = graphql`
  query($id: String!) {
    deck: deck(id: { eq: $id }) {
      id
      body
      title
    }
  }
`

const wrapper = (props) => {
  const slides = splitSlides(props)
  return (
    <>
      <SEO frontmatter={props._frontmatter} />
      <Deck {...props} slides={slides} />
    </>
  )
}

const components = {
  wrapper,
}

export default ({
  data: {
    deck: { id, body },
  },
  ...props
}) => {
  const Component = (props) => (
    <>
      <MDXRenderer {...props} children={body} />
    </>
  )
  return (
    <>
      <Component {...props} components={components} />
    </>
  )
}

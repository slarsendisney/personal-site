/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ frontmatter }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = frontmatter.desc || site.siteMetadata.description

  const url = "https://sld.codes"

  const metaImage = "https://ik.imagekit.io/sld/Logo__ok8RRhzzg3.png"

  return (
    <Helmet>
      <title>Sam Larsen-Disney | {frontmatter.title}</title>
      <meta name="title" content={frontmatter.title} />
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={frontmatter.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="Sam Larsen-Disney" />
      <meta name="twitter:title" content={frontmatter.title} />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
      <html lang="en" />
    </Helmet>
  )
}

SEO.defaultProps = {
  frontmatter: {},
}

SEO.propTypes = {
  frontmatter: PropTypes.object,
}

export default SEO

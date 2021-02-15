import { useStaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import { Helmet } from "react-helmet-async";

function SEO({ description, lang, meta, title, socialcard, video }) {
  const { site } = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
          siteUrl
          social {
            twitter
          }
        }
      }
    }
  `);
  const metaDescription = description || site.siteMetadata.description;
  const card = socialcard ? socialcard : "social-card-default";
  const cardUrl = "https://sld.codes/social-cards/" + card + ".jpg";
  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        titleTemplate={`%s · ${site.siteMetadata.title}`}
        meta={[
          ...(video
            ? [
                {
                  property: `og:video`,
                  content: `/video/${video}`,
                },
                {
                  property: `og:video:type`,
                  content: "video/mp4",
                },
                {
                  property: `og:video:width`,
                  content: "1200",
                },
                {
                  property: `og:video:height`,
                  content: "628",
                },
              ]
            : []),
          {
            name: `description`,
            content: metaDescription,
          },
          {
            property: `og:title`,
            content: title,
          },
          {
            property: `og:description`,
            content: metaDescription,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          {
            property: `og:image`,
            content: cardUrl,
          },
          {
            name: `twitter:card`,
            content: `summary_large_image`,
          },
          {
            name: `twitter:creator`,
            content: site.siteMetadata.social.twitter,
          },
          {
            name: `twitter:title`,
            content: title,
          },
          {
            name: `twitter:description`,
            content: metaDescription,
          },
          {
            name: `twitter:image`,
            content: cardUrl,
          },
        ].concat(meta)}
      />
    </>
  );
}

SEO.defaultProps = {
  lang: `en`,
  keywords: [],
  meta: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  socialcard: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  lang: PropTypes.string,
  meta: PropTypes.array,
  title: PropTypes.string.isRequired,
};

export default SEO;

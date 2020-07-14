import React from "react"
import { graphql, Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Timeline from "../components/Bio/Timeline"
import HeyHero from "../components/Bio/HeyHero"

export default function Bio({ data, location }) {
  const {
    currentCompany,
    currentRole,
    currentCompanyURL,
  } = data.site.siteMetadata
  return (
    <Layout>
      <SEO title={"Bio"} location={location} />
      <HeyHero data={data} />
      <div className=" is-light-grey-bg">
        <div className="is-white-bg pad-10-tb pad-3-lr">
          <div className="row container ">
            <div className="col-xs-12 ">
              <h2>
                I currently work as a {currentRole} at{" "}
                <OutboundLink
                  href={currentCompanyURL}
                  className="is-special-blue"
                >
                  {currentCompany}
                </OutboundLink>
                . I have built{" "}
                <Link
                  to="/projects/enhanced-referral"
                  className="is-special-blue"
                >
                  new ways to refer friends
                </Link>
                ,{" "}
                <Link to="/projects/grad" className="is-special-blue">
                  onboarding experiences
                </Link>{" "}
                and{" "}
                <Link to="/projects/corona-support" className="is-special-blue">
                  rapid response systems
                </Link>
                . I enjoy teaching the next generation to code through my{" "}
                <Link to="/articles" className="is-special-blue">
                  articles
                </Link>
                ,{" "}
                <Link to="/presentations" className="is-special-blue">
                  presentations
                </Link>{" "}
                and at hackathons.
              </h2>
              <h2>
                In the last year I have contributed{" "}
                {data.gitHubProfile.totalContributions} times to{" "}
                <OutboundLink
                  href="https://github.com/slarsendisney"
                  className="is-special-blue"
                >
                  open source projects
                </OutboundLink>
                . I maintain {data.boilerplates.totalCount}{" "}
                <Link to="/boilerplates" className="is-special-blue">
                  boilerplates
                </Link>{" "}
                and {data.allNpmPackage.totalCount}{" "}
                <OutboundLink
                  href="https://www.npmjs.com/~slarsendisney"
                  className="is-special-blue"
                >
                  npm packages
                </OutboundLink>
                .*
              </h2>
              <p>* These stats are refreshed daily at 9PM GMT.</p>
            </div>
          </div>
        </div>
        <div className="pad-10-tb pad-3-lr">
          <div className="row container ">
            <div className="col-xs-12">
              <h1 className="is-hero-sub-menu is-grey margin-0">My Career</h1>
              <Timeline />
            </div>
            <div className="col-xs-12 pad-2-lr pad-10-b">
              <h1 className="is-hero-sub-menu is-grey margin-0">
                Origin Story
              </h1>
              <div className="margin-5-t pad-5 is-white-bg is-grey border-radius lato">
                <MDXRenderer>{data.allMdx.edges[0].node.body}</MDXRenderer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    gitHubProfile {
      totalContributions
    }
    allNpmPackage {
      totalCount
    }
    boilerplates: allMdx(
      filter: { frontmatter: { type: { eq: "Boilerplate" } } }
    ) {
      totalCount
    }
    site {
      siteMetadata {
        currentCompany
        currentRole
        currentCompanyURL
      }
    }
    file(relativePath: { eq: "face.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    allMdx(
      filter: { frontmatter: { type: { eq: "BIO" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
    ) {
      edges {
        node {
          body
        }
      }
    }
  }
`

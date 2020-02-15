import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Project } from "../templates/Projects"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RecentEvents from "../components/RecentEvents"
const mediaLinks = [
  {
    type: "LinkedIn",
    url: "https://www.linkedin.com/in/samuel-larsen-disney/",
  },
  {
    type: "Medium",
    url: "https://medium.com/@samlarsendisney",
  },
  {
    type: "Twitter",
    url: "https://twitter.com/SamLarsenDisney",
  },
]

const sections = [
  {
    label: "👨🏼‍💻 About Me",
    type: "AboutMe",
    url: "/bio",
  },
  {
    label: "🔧 Projects",
    type: "Projects",
    url: "/projects",
  },
  {
    label: "🚀 Boilerplates",
    type: "Boilerplates",
    url: "/boilerplates",
  },
  {
    label: "📝 Articles",
    type: "Writing",
    url: "/articles",
  },
  {
    label: "🧙‍♂️ Slides",
    type: "Slides",
    url: "http://slides.sld.codes",
  },
  {
    label: "📸 Photography",
    type: "Photos",
    url: "/photos",
  },
]

const Article = ({ label, desc, url }) => {
  if (url.includes("http")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="link margin-15-b"
        id="path"
      >
        <div className="grow">
          <h1 className="margin-3-b margin-0-t">{label}</h1>
          <h3 className="margin-0-t">{desc}</h3>
        </div>
      </a>
    )
  } else {
    return (
      <Link to={url} className="link margin-15-b" id="path">
        <div className="grow">
          <h1 className="margin-3-b margin-0-t">{label}</h1>
          <h3 className="margin-0-t">{desc}</h3>
        </div>
      </Link>
    )
  }
}

const Logo = ({ type, url }) => {
  const [active, setActive] = useState(false)
  return (
    <button
      onClick={() => {
        window.open(url, "_blank")
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="margin-3-r grow"
    >
      <img
        src={require(`../images/social_media/${
          active ? `${type}` : `${type}-disabled`
        }.svg`)}
        style={{ cursor: "pointer" }}
        alt={type}
      />
    </button>
  )
}
export default function Start({ data }) {
  const featured = data.allMarkdownRemark.edges[0].node.frontmatter
  return (
    <Layout>
      <SEO title="Home" />
      <div className="is-grey is-light-grey-bg">
        <div className="row container-small pad-20-t">
          <div className="col-xs-12 col-md-6 pad-10-l">
            <h1 className="is-hero-menu margin-0">Sam</h1>
            <h1 className="is-hero-menu margin-0">Larsen-Disney</h1>
            <div className="line margin-10-t margin-10-b" />
            <div className="border" />
            <h4 className="is-hero-sub-text">
              Design Engineer working @{" "}
              <button
                style={{ color: "#046ED0", cursor: "pointer" }}
                onClick={() => {
                  window.open("https://www.americanexpress.com", "_blank")
                }}
              >
                American Express.
              </button>
            </h4>
            <div className="row container-small pad-2 pad-6-t pad-10-b  pad-10-b">
              {mediaLinks.map(item => (
                <Logo type={item.type} url={item.url} />
              ))}
            </div>
          </div>
          <div className="col-xs-12 col-md-6 pad-5-l pad-10-b">
            {sections.map((item, index) => (
              <div className="col-xs-12 ">
                <div className="col-xs-10 col-md-12">
                  <Article {...item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="is-grey is-white-bg">
        <div className="row container-small pad-10-t pad-20-b">
          <div className="pad-10-l pad-10-r">
            <h2 className="">Latest Project</h2>
            <Project {...featured} />
          </div>
        </div>
      </div>
      <div className="is-grey is-light-grey-bg">
        <div className="row container-small pad-10-t pad-20-b">
          <div className="pad-10-l pad-10-r">
            <h2 className="margin-0-b">Recent Events</h2>
          </div>
          <RecentEvents />
        </div>
      </div>

      <div className="is-grey is-pink-bg">
        <div className="row container-small pad-20-t pad-20-b">
          <div className="col-xs-12 text-align-center">
            <h1 className="is-white-always">For The People Who Prefer Paper</h1>
            <Link to="/cv">
              <button
                className="btn "
                style={{
                  minWidth: 300,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                View CV
              </button>
            </Link>
            <p className="is-white-always">(Please print responsibly)</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "Project" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1
    ) {
      edges {
        node {
          frontmatter {
            type
            title
            desc
            date
            path
            coverimg {
              childImageSharp {
                fluid(maxWidth: 1000) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`

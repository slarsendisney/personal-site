import React, { useState } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

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
    label: "About Me",
    type: "AboutMe",
    url: "/aboutme",
  },
  {
    label: "Art",
    type: "Art",
    url: "/art",
  },
  {
    label: "Projects",
    type: "Projects",
    url: "/projects",
  },
]

const Logo = ({ type, url }) => {
  const [active, setActive] = useState(false)
  return (
    <div
      onClick={() => {
        window.open(url, "_blank")
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="margin-3-r"
    >
      <img
        src={require(`../images/social_media/${
          active ? `${type}` : `${type}-disabled`
        }.svg`)}
        style={{ cursor: "pointer" }}
      />
    </div>
  )
}
const IndexPage = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <div className="is-grey is-light-grey-bg">
        <div className="row container-small pad-20-t ">
          <div className="col-xs-8 pad-10-l">
            <p className="is-hero-menu margin-0">Sam</p>
            <p className="is-hero-menu margin-0">Larsen-Disney</p>
            <div className="line margin-10-t margin-10-b" />
            <div className="border" />
            <h4 className="is-hero-sub-text">
              Design Engineer working @
              <span
                style={{ color: "#046ED0", cursor: "pointer" }}
                onClick={() => {
                  window.open("https://www.americanexpress.com", "_blank")
                }}
              >
                {" "}
                American Express.
              </span>
            </h4>
          </div>
        </div>
        <div className="row container-small pad-2 pad-6-t pad-10-b pad-10-l">
          {mediaLinks.map(item => (
            <Logo type={item.type} url={item.url} />
          ))}
        </div>
      </div>
      {/* <div className="row container pad-20-t is-grey">
        {sections.map((item, index) => (
          <div className={`col-xs-12 row margin-20-b`}>
            <div className="col-xs-12 col-md-5 flex align-vertical pad-10-b">
              <img
                src={require(`../images/categories/${item.type}.svg`)}
                style={{ width: "100%", maxWidth: 200, margin: "auto" }}
              />
            </div>
            <div className="col-xs-0 col-md-1" />
            <div className="col-xs-12 col-md-6">
              <p className="is-hero-menu margin-0">{item.label}</p>
              <h4 className="pad-5-t is-hero-sub-text">
                A description of the awesome project. A description of the
                awesome project.A description of the awesome project.A
                description of the awesome project.A description of the awesome
                project.A description of the awesome project.
              </h4>
              <div className="btn margin-6-t">SEE MORE</div>
            </div>
          </div>
        ))}
      </div> */}
    </Layout>
  )
}

export default IndexPage

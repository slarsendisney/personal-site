import React from "react"

import { Link } from "gatsby"
import { getSearchParams } from "gatsby-query-params"
import Layout from "../components/layout"
import experience from "../data/timeline.json"
import education from "../data/education.json"
import skills from "../data/skills.json"
import SEO from "../components/seo"
import logo from "../images/Logo.svg"
const html2canvas = typeof window !== "undefined" ? require("html2canvas") : ""
const jsPDF = typeof window !== "undefined" ? require("jspdf") : ""

export default () => {
  const immediatePrint =
    typeof document !== "undefined" ? getSearchParams().download : null
  const printDocument = () => {
    const input = document.getElementById("cvDiv")
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/jpeg", 1)
      const pdf = new jsPDF("portrait", "mm", "a4")
      pdf.scaleFactor = 3
      pdf.addImage(imgData, 0, 0, 210, 297)
      //pdf.output("dataurlnewwindow")
      pdf.save("CV-SamuelLarsen-Disney.pdf")
    })
  }
  if (immediatePrint) {
    if (typeof window !== "undefined") {
      window.history.replaceState({}, document.title, "/cv")
      printDocument()
    }
  }
  return (
    <div style={{ minWidth: "240mm" }}>
      <Layout>
        <SEO title="CV" />
        <div className="is-pink-bg pad-10-b">
          <div className="container row pad-5">
            <div className="col-xs-12 text-align-center">
              <button
                className="btn"
                onClick={printDocument}
                style={{ width: 200, borderRadius: 8 }}
              >
                🖨 Print Me
              </button>
            </div>
            <div className="col-xs-12">
              <div
                className="is-white-bg-always pad-1-b margin-5-t margin-3-b"
                style={{ opacity: 0.1 }}
              />
            </div>
          </div>
          <div
            className="paper"
            style={{
              backgroundColor: "",
              width: "210mm",

              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div
              id="cvDiv"
              className=""
              style={{
                backgroundColor: "",
                width: "210mm",
                height: "297mm",
                marginLeft: "auto",
                marginRight: "auto",
                position: "relative",
              }}
            >
              <div className="row pad-10">
                <div
                  className="col-xs-12"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <h1 className="margin-0">Samuel Larsen-Disney</h1>
                  <h4 className="margin-0">
                    Front-end Developer & UX Designer
                  </h4>
                  <p className="body-text">
                    I hope to significantly contribute to the fields of UX
                    design and Web development while giving myself an
                    opportunity to put my problem-solving abilities to the test,
                    on a regular basis, as I enjoy a constant challenge in my
                    work.
                  </p>
                </div>
                <div className="col-xs-12 is-light-grey-bg-always pad-1-b margin-2-t margin-3-b" />
                <div className="col-xs-6">
                  <h5 className="margin-0 margin-3-b is-pink-always">
                    EXPERIENCE
                  </h5>
                  {experience.map(item => (
                    <div className="margin-3-b">
                      <h3 className="margin-0 margin-1-t">{item.role}</h3>
                      <h5 className="margin-0 margin-1-t">
                        {item.location} | {item.date}
                      </h5>
                      <p
                        className="body-text margin-0 margin-1-t"
                        dangerouslySetInnerHTML={{
                          __html: item.longDesc ? item.longDesc : item.desc,
                        }}
                      />
                      <p
                        className="body-text margin-1-t"
                        style={{ color: "#067BC2" }}
                      >
                        {item.tags}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="col-xs-6">
                  <h5 className="margin-0 margin-3-b is-pink-always">
                    EDUCATION
                  </h5>
                  {education.map(item => (
                    <div className="margin-3-b">
                      <h3 className="margin-0 margin-1-t">{item.type}</h3>
                      <h5 className="margin-0 margin-1-t">
                        {item.location} | {item.date}
                      </h5>
                      <p className="body-text margin-0 margin-1-t ">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                  <h5 className="margin-0 margin-3-b is-pink-always">
                    OUTSIDE WORK
                  </h5>

                  <p className="body-text margin-0">
                    Examples of personal projects that I have worked on can be
                    found at{" "}
                    <Link
                      to="/projects"
                      className="link"
                      style={{ color: "#067BC2" }}
                    >
                      sld.codes/projects.
                    </Link>{" "}
                    You can read about them at{" "}
                    <Link
                      to="/articles"
                      className="link"
                      style={{ color: "#067BC2" }}
                    >
                      sld.codes/articles
                    </Link>
                    .
                  </p>

                  <p className="body-text margin-0 margin-1-t ">
                    When I'm not in the office I like to attend hackathons. At
                    these events I enjoy teaching the next generation to code
                    and have a bit of a reputation for staying up all night.
                  </p>

                  <p className="body-text margin-0 margin-1-t  margin-3-b">
                    I've always enjoyed photography, I have worked on everything
                    from wildlife to wedding photography. One of my photos "The
                    Brighton Fox" was featured in Brighton & Hove's Annual
                    Calendar in 2018. One of my dreams is to have my hobby
                    featured in the Wildlife Photographer of the Year Exhibition
                    at the Natural History Museum in London.
                  </p>

                  <h5 className="margin-0 margin-3-t margin-3-b is-pink-always">
                    CORE SKILLS
                  </h5>
                  <div className="row">
                    {skills.map(skill => (
                      <div className="col-xs-4 pad-0">
                        <p className="body-text margin-0 margin-1-b">{skill}</p>
                      </div>
                    ))}
                  </div>
                  <h5 className="margin-0 margin-3-t margin-3-b is-pink-always">
                    CONTACT
                  </h5>

                  <p className="body-text margin-0 margin-1-b">
                    Website - sld.codes
                  </p>
                  <p className="body-text margin-0 margin-1-b">
                    Email - s.larsendisney@gmail.com
                  </p>
                  <p className="body-text margin-0 margin-1-b">
                    Phone - +447926147958{" "}
                  </p>
                </div>
              </div>
              <div
                className="pad-10"
                style={{ position: "absolute", bottom: 0, right: 0 }}
              >
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    width: 40,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

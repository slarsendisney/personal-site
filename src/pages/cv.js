import React from "react"
import { PDFExport } from "@progress/kendo-react-pdf"
import { Link } from "gatsby"
import Layout from "../components/layout"
import experience from "../data/timeline.json"
import education from "../data/education.json"
import { DesignSkills, CodeSkills } from "../data/skills.js"
import contact from "../data/contact.json"
import SEO from "../components/seo"
import logo from "../images/Logo.svg"
import { styles } from "../components/cvStyles"

export default class extends React.Component {
  pdfExportComponent
  render() {
    return (
      <div style={{ minWidth: "240mm" }}>
        <Layout>
          <SEO title="CV" />
          <div className="is-pink-bg pad-10-b">
            <div className="container row pad-5">
              <div className="col-xs-12 text-align-center">
                <button
                  className="btn"
                  onClick={() => {
                    this.pdfExportComponent.save()
                  }}
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
              className="paper "
              style={{
                backgroundColor: "",
                width: "210mm",

                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <PDFExport
                scale={0.75}
                paperSize="A4"
                margin="0cm"
                ref={component => (this.pdfExportComponent = component)}
                fileName="CV-SamuelLarsen-Disney"
              >
                <div
                  id="cvDiv"
                  className="special-div"
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
                      <div className="flex">
                        <h5
                          className="body-text margin-0"
                          style={{ color: "#067BC2" }}
                        >{`${contact.website} | ${contact.email} | ${contact.phone}`}</h5>
                      </div>
                      <p className="body-text margin-1-tb">
                        Creative, collaborative and courageous developer with
                        extensive experience in web based technologies and UX
                        design. Looking for the next challenge to improve
                        customer experience to deepen engagement.
                      </p>
                    </div>
                    <div className="col-xs-12 is-light-grey-bg-always pad-1-b margin-2-t margin-3-b" />

                    <div className="col-xs-3">
                      <h5 className="margin-0  margin-2-b is-light-blue-always">
                        TECHNICAL SKILLS
                      </h5>
                      <div className="row">
                        {CodeSkills.map(skill => (
                          <div className="col-xs-12 pad-0">
                            <p className="body-text margin-0 margin-1-b">
                              {skill}
                            </p>
                          </div>
                        ))}
                      </div>
                      <h5 className="margin-2-tb is-light-blue-always">
                        DESIGN SKILLS
                      </h5>
                      <div className="row">
                        {DesignSkills.map(skill => (
                          <div className="col-xs-12 pad-0">
                            <p className="body-text margin-0 margin-1-b">
                              {skill}
                            </p>
                          </div>
                        ))}
                      </div>
                      <h5 className="margin-2-tb is-light-blue-always">
                        EDUCATION
                      </h5>
                      {education.map(item => (
                        <div className="margin-3-b">
                          <h4 className="margin-0 margin-1-t">{item.type}</h4>
                          <p className="body-text margin-0 margin-1-t">
                            {`${item.location}`}
                          </p>
                          <p className="body-text margin-0 margin-1-t ">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                      <h5 className="margin-0 margin-2-b is-light-blue-always">
                        INTERESTS
                      </h5>

                      <p className="body-text margin-0 margin-1-t ">
                        When I'm not in the office I like to attend hackathons.
                        At these events I enjoy teaching the next generation to
                        code and have a bit of a reputation for staying up all
                        night.
                      </p>

                      <p className="body-text margin-0 margin-1-t  margin-3-b">
                        I've always enjoyed photography, I have worked on
                        everything from wildlife to wedding photography. One of
                        my photos "The Brighton Fox" was featured in Brighton &
                        Hove's Annual Calendar in 2018.
                      </p>
                    </div>
                    <div className="col-xs-9">
                      <h5 className="margin-0 margin-2-b is-light-blue-always">
                        EXPERIENCE
                      </h5>
                      {experience.map(item => (
                        <div className="margin-3-b">
                          <h3 className="margin-0 margin-1-t">{item.role}</h3>
                          <h5 className="margin-0 margin-1-tb">
                            {`${item.company}, ${item.location} | ${item.date}`}
                          </h5>

                          {item.longDesc.map(desc => (
                            <div className="flex">
                              <p className="body-text margin-0 margin-1-r">{`-`}</p>
                              <p className="body-text margin-0">{desc}</p>
                            </div>
                          ))}

                          <p
                            className="body-text margin-1-t"
                            style={{ color: "#067BC2" }}
                          >
                            {item.tags}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PDFExport>
              <style>{styles}</style>
            </div>
          </div>
        </Layout>
      </div>
    )
  }
}

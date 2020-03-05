import React from "react"
import { PDFExport } from "@progress/kendo-react-pdf"
import Layout from "../components/layout"
import experience from "../data/timeline.json"
import education from "../data/education.json"
import { DesignSkills, DesignTools, CodeSkills } from "../data/skills.js"
import contact from "../data/contact.json"
import SEO from "../components/seo"
import work from "../images/cv_icons/work.svg"
import pencil from "../images/cv_icons/pencil.svg"
import code from "../images/cv_icons/code.svg"
import tools from "../images/cv_icons/tools.svg"
import school from "../images/cv_icons/school.svg"
import interests from "../images/cv_icons/interests.svg"
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
                          className="body-text margin-0 margin-1-t"
                          style={{ color: "#067BC2" }}
                        >
                          {contact.website}&nbsp;&nbsp;|&nbsp;&nbsp;
                          {contact.email}&nbsp;&nbsp;|&nbsp;&nbsp;
                          {contact.phone}
                        </h5>
                      </div>
                      <p className="body-text margin-1-tb">
                        Creative, collaborative and courageous developer with
                        extensive experience in web based technologies and UX
                        design. Looking for the next challenge to improve
                        customer experience and deepen engagement.
                      </p>
                    </div>
                    <div className="col-xs-12 border-top pad-1-b margin-2-t margin-2-b margin-1-lr" />

                    <div className="col-xs-3">
                      <h5 className="margin-0  margin-2-b flex align-horizontal is-special-blue">
                        <img
                          src={code}
                          alt=""
                          width={15}
                          className="margin-1-r"
                        />
                        TECHNICAL SKILLS
                      </h5>
                      <div className="row">
                        {CodeSkills.map(skill => (
                          <div className="col-xs-6 pad-0">
                            <p className="body-text2 margin-0 margin-1-b">
                              {skill}
                            </p>
                          </div>
                        ))}
                      </div>
                      <h5 className="border-top pad-2-t margin-2-tb flex align-horizontal is-special-blue">
                        <img
                          src={pencil}
                          alt=""
                          width={15}
                          className="margin-1-r"
                        />
                        DESIGN EXPERTISE
                      </h5>
                      <div className="row">
                        {DesignSkills.map(skill => (
                          <div className="col-xs-12 pad-0">
                            <p className="body-text2 margin-0 margin-1-b">
                              {skill}
                            </p>
                          </div>
                        ))}
                      </div>
                      <h5 className="border-top pad-2-t margin-2-tb flex align-horizontal is-special-blue">
                        <img
                          src={tools}
                          alt=""
                          width={15}
                          className="margin-1-r"
                        />
                        DESIGN TOOLS
                      </h5>
                      <div className="row">
                        {DesignTools.map(skill => (
                          <div className="col-xs-6 pad-0">
                            <p className="body-text2 margin-0 margin-1-b">
                              {skill}
                            </p>
                          </div>
                        ))}
                      </div>
                      <h5 className="border-top pad-2-t margin-2-tb flex align-horizontal is-special-blue">
                        <img
                          src={school}
                          alt=""
                          width={12}
                          className="margin-1-r"
                        />
                        EDUCATION
                      </h5>
                      {education.map(item => (
                        <div className="margin-3-b">
                          <h4 className="margin-0 margin-1-t">{`${item.type} - ${item.location}`}</h4>
                          <p className="body-text margin-0 margin-1-t">{}</p>
                          <p className="body-text margin-0 margin-1-t ">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                      <h5 className="border-top pad-2-t margin-2-t margin-2-b flex align-horizontal is-special-blue">
                        <img
                          src={interests}
                          alt=""
                          width={15}
                          className="margin-1-r"
                        />
                        INTERESTS
                      </h5>
                      <h4 className="margin-0 margin-1-t">Hackathons</h4>
                      <p className="body-text margin-0 margin-1-t margin-3-b">
                        I enjoy teaching the next generation to code and have a
                        bit of a reputation for staying up all night.
                      </p>
                      <h4 className="margin-0 margin-1-t">Photography</h4>
                      <p className="body-text margin-0 margin-1-t margin-3-b">
                        Everything from wildlife to wedding photography. One of
                        my photos "The Brighton Fox" was featured in Brighton &
                        Hove's Annual Calendar in 2019.
                      </p>
                    </div>
                    <div className="col-xs-9 pad-3-l">
                      <h5 className="margin-0 margin-2-b flex align-horizontal is-special-blue">
                        <img
                          src={work}
                          alt=""
                          width={12}
                          className="margin-1-r"
                        />
                        EXPERIENCE
                      </h5>
                      {experience.map((item, index) => (
                        <div
                          className={`margin-3-b ${
                            index > 0 ? "border-top pad-2-t" : ""
                          } `}
                        >
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
                            className="body-text margin-1-t margin-2-l"
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

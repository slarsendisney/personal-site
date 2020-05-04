import React from "react"
import experience from "../../data/timeline.json"
import education from "../../data/education.json"
import { DesignSkills, DesignTools, CodeSkills } from "../../data/skills.js"
import contact from "../../data/contact.json"
import work from "../../images/cv_icons/work.svg"
import pencil from "../../images/cv_icons/pencil.svg"
import code from "../../images/cv_icons/code.svg"
import tools from "../../images/cv_icons/tools.svg"
import school from "../../images/cv_icons/school.svg"
import interests from "../../images/cv_icons/interests.svg"
import SkillsSection from "./SkillsSection"
import Education from "./Education"
import Experience from "./Experience"
import Contact from "./Contact"
import Intro from "./Intro"
import Interests from "./Interests"

export default () => (
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
    <div className="row pad-5">
      <div
        className="col-xs-12 "
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h1 className="margin-0">Samuel Larsen-Disney</h1>
        <div className="flex">
          <Contact contact={contact} />
        </div>
        <Intro />
      </div>
      <div className="col-xs-12 border-top pad-1-b margin-2-t margin-2-b margin-1-lr" />

      <div className="col-xs-3">
        <SkillsSection
          noBorderTop
          heading="TECHNICAL SKILLS"
          icon={code}
          colClass="col-xs-6"
          skills={CodeSkills}
        />
        <SkillsSection
          heading="DESIGN EXPERTISE"
          icon={pencil}
          colClass="col-xs-12"
          skills={DesignSkills}
        />
        <SkillsSection
          heading="DESIGN TOOLS"
          icon={tools}
          colClass="col-xs-6"
          skills={DesignTools}
        />

        <Education education={education} icon={school} />
        <Interests icon={interests} />
      </div>
      <div className="col-xs-9 pad-3-l">
        <Experience experience={experience} icon={work} />
      </div>
    </div>
  </div>
)

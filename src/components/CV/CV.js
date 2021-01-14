import React from "react";
import experience from "../../data/timeline.json";
import education from "../../data/education.json";
import { DesignSkills, DesignTools, CodeSkills } from "../../data/skills";
import SkillsSection from "../../components/CV/SkillsSection";
import work from "../../images/cv_icons/work.svg";
import pencil from "../../images/cv_icons/pencil.svg";
import code from "../../images/cv_icons/code.svg";
import tools from "../../images/cv_icons/tools.svg";
import Education from "../../components/CV/Education";
import school from "../../images/cv_icons/school.svg";
import Interests from "../../components/CV/Interests";
import interestsIcon from "../../images/cv_icons/interests.svg";
import Experience from "../../components/CV/Experience";

const CV = () => (
  <div className="p-5">
    <h1 className="text-2xl font-bold">Samuel Larsen-Disney</h1>
    <h3 className="text-sm font-semibold">
      www.sld.codes | s.larsendisney@gmail.com
    </h3>
    <p className="text-xs border-light-grey border-b-2 pb-3 mb-3">
      A front-end developer with four years experience using ReactJS to build performant and accessible applications. Looking for the next challenge to
      improve customer experience and deepen engagement.
    </p>
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-1">
        <SkillsSection
          noBorderTop
          heading="TECHNICAL SKILLS"
          icon={code}
          colClass="grid grid-cols-2 gap-1"
          skills={CodeSkills}
        />
        <SkillsSection
          heading="DESIGN EXPERTISE"
          icon={pencil}
          colClass="grid grid-cols-1 gap-1"
          skills={DesignSkills}
        />
        <SkillsSection
          heading="DESIGN TOOLS"
          icon={tools}
          colClass="grid grid-cols-2 gap-1"
          skills={DesignTools}
        />
        <Education education={education} icon={school} />
        <Interests icon={interestsIcon} />
      </div>
      <div className="col-span-3">
        <Experience experience={experience} icon={work} />
      </div>
    </div>
  </div>
);

export default CV;

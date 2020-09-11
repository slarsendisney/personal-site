import React from "react";
import PropTypes from "prop-types";

const SkillsSection = ({ heading, icon, colClass, skills, noBorderTop }) => (
  <>
    <h5
      className={`${
        !noBorderTop ? "border-light-grey border-t-2  mt-2 pt-2" : " mt-0"
      }  flex items-center text-xs mb-1 text-blue font-semibold`}
    >
      <img src={icon} alt="" className="mr-1 h-3" />
      {heading}
    </h5>
    <div className={colClass}>
      {skills.map((skill) => (
        <div className="pad-0" key={skill}>
          <p className="text-xs">{skill}</p>
        </div>
      ))}
    </div>
  </>
);

SkillsSection.propTypes = {
  heading: PropTypes.string,
  icon: PropTypes.string,
  colClass: PropTypes.string,
  skills: PropTypes.string,
  noBorderTop: PropTypes.bool,
};

export default SkillsSection;

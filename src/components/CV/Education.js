import React from "react";
import PropTypes from "prop-types";

const Education = ({ education, icon }) => (
  <>
    <h5 className="border-light-grey border-t-2  mt-2 pt-2 flex items-center text-xs mb-1 text-blue font-semibold">
      <img src={icon} alt="" className="mr-1 h-3" />
      EDUCATION
    </h5>
    {education.map((item) => (
      <div className="" key={item.location}>
        <h4 className="text-xs font-bold">{`${item.type} - ${item.location}`}</h4>
        <p className="text-xs">{item.desc}</p>
      </div>
    ))}
  </>
);

Education.propTypes = {
  icon: PropTypes.string,
  education: PropTypes.string,
};

export default Education;

import React from "react";
import PropTypes from "prop-types";

const Interests = ({ icon }) => (
  <>
    <h5 className="border-light-grey border-t-2  mt-2 pt-2 flex items-center text-xs mb-1 text-blue font-semibold">
      <img src={icon} alt="" className="mr-1 h-3" />
      INTERESTS
    </h5>

    <h4 className="text-xs font-bold">Hackathons</h4>
    <p className="text-xs">
      I enjoy teaching the next generation to code and have a bit of a
      reputation for staying up all night.
    </p>
    <h4 className="text-xs font-bold">Photography</h4>
    <p className="text-xs">
      Everything from wildlife to wedding photography. One of my photos
      &quot;The Brighton Fox&quot; was featured in Brighton & Hove&apos;s Annual
      Calendar in 2019.
    </p>
    <p className="text-xs font-semibold text-blue mt-2">
      This CV was coded in ReactJS.
    </p>
  </>
);

Interests.propTypes = {
  icon: PropTypes.string,
};

export default Interests;

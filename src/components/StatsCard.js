import React from "react";
import PropTypes from "prop-types";
const StatsCard = ({ name, nFiles, code, percentage }) => (
  <div className="my-2">
    <h3>
      <strong>
        {percentage}% {name}
      </strong>
    </h3>
    <h4>{nFiles} files</h4>
    <h4>{code} lines</h4>
  </div>
);

StatsCard.propTypes = {
  name: PropTypes.string,
  nFiles: PropTypes.string,
  code: PropTypes.string,
  percentage: PropTypes.string,
};

export default StatsCard;

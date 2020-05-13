import React from "react"

export default ({ name, nFiles, comment, code, percentage }) => (
  <div className="col-xs-6 col-md-3 is-grey">
    <h3>
      <strong>
        {percentage}% {name}
      </strong>
    </h3>
    <h4>{nFiles} files</h4>
    <h4>{code} lines</h4>
  </div>
)

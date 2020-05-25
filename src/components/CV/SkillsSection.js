import React from "react"

export default ({ heading, icon, colClass, skills, noBorderTop }) => (
  <>
    <h5
      className={`${
        !noBorderTop
          ? "border-top  margin-2-tb pad-2-t"
          : "margin-2-b margin-0-t"
      }  flex align-horizontal is-special-blue-always`}
    >
      <img src={icon} alt="" width={15} className={`margin-1-r`} />
      {heading}
    </h5>
    <div className="row">
      {skills.map((skill) => (
        <div className={`${colClass} pad-0`}>
          <p className="body-text2 margin-0 margin-1-b">{skill}</p>
        </div>
      ))}
    </div>
  </>
)

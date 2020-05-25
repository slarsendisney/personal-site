import React from "react"

export default ({ education, icon }) => (
  <>
    <h5 className="border-top pad-2-t margin-2-tb flex align-horizontal is-special-blue-always">
      <img src={icon} alt="" width={12} className="margin-1-r" />
      EDUCATION
    </h5>
    {education.map((item) => (
      <div className="margin-3-b">
        <h4 className="margin-0 margin-1-t">{`${item.type} - ${item.location}`}</h4>
        <p className="body-text margin-0 margin-1-t">{}</p>
        <p className="body-text margin-0 margin-1-t ">{item.desc}</p>
      </div>
    ))}
  </>
)

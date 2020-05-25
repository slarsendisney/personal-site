import React from "react"

export default ({ experience, icon }) => (
  <>
    <h5 className="margin-0 margin-2-b flex align-horizontal is-special-blue-always">
      <img src={icon} alt="" width={12} className="margin-1-r" />
      EXPERIENCE
    </h5>
    {experience.map((item, index) => (
      <div className={`margin-3-b ${index > 0 ? "border-top pad-2-t" : ""} `}>
        <h3 className="margin-0 margin-1-t">{item.role}</h3>
        <h5 className="margin-0 margin-1-tb">
          {`${item.company}, ${item.location} | ${item.date}`}
        </h5>

        {item.longDesc.map((desc) => (
          <div style={{ display: "flex" }}>
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
  </>
)

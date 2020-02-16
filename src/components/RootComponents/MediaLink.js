import React, { useState } from "react"

export default ({ type, url }) => {
  const [active, setActive] = useState(false)
  return (
    <button
      onClick={() => {
        window.open(url, "_blank")
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="margin-3-r grow"
    >
      <img
        src={require(`../../images/social_media/${
          active ? `${type}` : `${type}-disabled`
        }.svg`)}
        style={{ cursor: "pointer" }}
        alt={type}
      />
    </button>
  )
}

import React, { useState } from "react"

export default ({ type, url }) => {
  const [active, setActive] = useState(false)
  return (
    <a href={url}>
      <button
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        className="margin-3-r grow"
      >
        <img
          src={require(`../../images/social_media/${
            active ? `${type}` : `${type}-disabled`
          }.svg`)}
          style={{ cursor: "pointer", height: 45 }}
          alt={type}
        />
      </button>
    </a>
  )
}

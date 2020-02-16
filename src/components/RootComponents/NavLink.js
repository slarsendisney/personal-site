import React from "react"
import { Link } from "gatsby"

export default ({ label, desc, url }) => {
  if (url.includes("http")) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="link margin-15-b"
        id="path"
      >
        <div className="grow">
          <h1 className="margin-3-b margin-0-t">{label}</h1>
          <h3 className="margin-0-t">{desc}</h3>
        </div>
      </a>
    )
  } else {
    return (
      <Link to={url} className="link margin-15-b" id="path">
        <div className="grow">
          <h1 className="margin-3-b margin-0-t">{label}</h1>
          <h3 className="margin-0-t">{desc}</h3>
        </div>
      </Link>
    )
  }
}

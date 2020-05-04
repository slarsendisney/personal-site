import React from "react"

export default ({ contact }) => (
  <h5 className="body-text margin-0" style={{ color: "#067BC2" }}>
    {contact.website}&nbsp;&nbsp;|&nbsp;&nbsp;
    {contact.email}&nbsp;&nbsp;|&nbsp;&nbsp;
    {contact.phone}
  </h5>
)

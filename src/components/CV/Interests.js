import React from "react"

export default ({ icon }) => (
  <>
    <h5 className="border-top pad-2-t margin-2-t margin-2-b flex align-horizontal is-special-blue-always">
      <img src={icon} alt="" width={15} className="margin-1-r" />
      INTERESTS
    </h5>

    <h4 className="margin-0 margin-1-t">Hackathons</h4>
    <p className="body-text margin-0 margin-1-t margin-2-b">
      I enjoy teaching the next generation to code and have a bit of a
      reputation for staying up all night.
    </p>
    <h4 className="margin-0 margin-1-t">Photography</h4>
    <p className="body-text margin-0 margin-1-t margin-2-b">
      Everything from wildlife to wedding photography. One of my photos "The
      Brighton Fox" was featured in Brighton & Hove's Annual Calendar in 2019.
    </p>
    <p className=" border-top pad-2-t body-text margin-0 margin-1-t margin-2-b">
      This CV was coded in ReactJS.
    </p>
  </>
)

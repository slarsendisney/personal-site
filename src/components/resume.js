import React from "react"
import experience from "../data/timeline.json"

export default () => {
  return (
    <div className="row pad-10">
      <div className="col-xs-12">
        <h1 className="margin-0">Samuel Larsen-Disney</h1>
        <h4 className="margin-0 is-pink-always">
          Full-Stack Engineer + UX Designer
        </h4>
        <hr className="margin-3-t" />
      </div>
      <div className="col-xs-6 pad-3-l pad-3-r">
        <h4 className="margin-0 margin-5-b">Experience</h4>
        {experience.map(job => {
          return (
            <div className="margin-5-b">
              <h3 className="margin-0 margin-1-b">{job.role}</h3>
              <h5 className="margin-0 margin-1-b">{job.date}</h5>
              <h6 className="margin-0 margin-1-b">
                {job.location}: {job.desc}
              </h6>
              <h6 className="margin-0 margin-1-b is-grey-always">{job.tags}</h6>
            </div>
          )
        })}
      </div>
      <div className="col-xs-6 pad-3-l pad-3-r">
        <h4 className="margin-0">Education</h4>
      </div>
    </div>
  )
}

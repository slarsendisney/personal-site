import React from "react"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"

const events = [
  {
    role: "Design Engineer",
    location: "American Express, London",
    date: "Sep 2019 - Present",
    desc:
      "User Experience, Visual Design, Rapid Prototyping, ReactJS, GatsbyJS, Adobe Suite, Sketch",
  },
  {
    role: "Graduate UX Designer",
    location: "American Express, Burgess Hill",
    date: "Feb 2019 - Sep 2019",
    desc: "User Experience, Visual Design, ReactJS, GatsbyJS, Sketch",
  },
  {
    role: "Graduate Front-End Engineer",
    location: "American Express, Burgess Hill",
    date: "Sep 2018 - Feb 2019",
    desc: "Internal Tooling, Analytics, ReactJS",
  },
  {
    role: "Summer Intern",
    location: "American Express, Burgess Hill",
    date: "Jun 2017 - August 2017",
    desc: "Data Visualisation, Analysis, Logging, ELK stack, Java",
  },
]
export default () => (
  <VerticalTimeline>
    {events.map(item => (
      <VerticalTimelineElement
        className="vertical-timeline-element--work lato"
        date={item.date.toUpperCase()}
        iconStyle={{ background: "rgb(234, 78, 103)", color: "#fff" }}
      >
        <h6 className="vertical-timeline-element-title is-blue-always pad-0-b">
          {item.location.toUpperCase()}
        </h6>
        <p className="vertical-timeline-element-subtitle is-grey-always">
          {item.role}
        </p>
        <p className="is-grey-always">{item.desc}</p>
      </VerticalTimelineElement>
    ))}
  </VerticalTimeline>
)

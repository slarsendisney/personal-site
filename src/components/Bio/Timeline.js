import React from "react"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import events from "../../data/timeline.json"

export default () => (
  <VerticalTimeline>
    {events.map((item) => (
      <VerticalTimelineElement
        className="vertical-timeline-element--work lato is-black"
        date={item.date.toUpperCase()}
        iconStyle={{ background: "rgb(234, 78, 103)", color: "#fff" }}
        key={item.role + item.company}
      >
        <h6 className="vertical-timeline-element-title is-blue-always pad-0-b">
          {`${item.company.toUpperCase()}, ${item.location.toUpperCase()}`}
        </h6>
        <p className="vertical-timeline-element-subtitle is-grey-always">
          {item.role}
        </p>
        <p className="is-grey-always">{item.desc}</p>
      </VerticalTimelineElement>
    ))}
  </VerticalTimeline>
)

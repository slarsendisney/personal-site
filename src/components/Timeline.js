import React from "react"
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import events from "../data/timeline.json"

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

import React from "react"
import Loadable from "@loadable/component"
const P5Wrapper = Loadable(() => import("react-p5-wrapper"))

function hashCode(str) {
  var hash = 0
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

function intToRGB(i) {
  var c = (i & 0x00ffffff).toString(16).toUpperCase()

  return "00000".substring(0, 6 - c.length) + c
}

function prettifyKey(key) {
  const string = key.replace("_", " ")
  return string.toUpperCase()
}

export default ({ start_epoch_ms, end_epoch_ms, summaries }) => {
  const date = new Date(start_epoch_ms)
  const allSummaries = { colours: {} }
  summaries
    .sort((a, b) => b.metric - a.metric)
    .map(item => {
      allSummaries[item.metric] = item.value
      allSummaries.colours[item.metric] =
        "#" + intToRGB(hashCode(item.value + "colour" + item.metric))
      return ""
    })
  let x = 80
  const y = 80
  const height = 496.1
  const width = 350.8
  const {
    steps,
    heart_rate,
    distance,
    ascent,
    descent,
    calories,
  } = allSummaries
  const sketch = p => {
    p.setup = () => {
      p.createCanvas(width, height)
    }
    p.draw = () => {
      p.background(allSummaries.colours.pace)
      let c = p.color("white")
      if (steps) {
        c = p.color(allSummaries.colours.steps)
        p.fill(c)
        p.ellipse(width - x, height / 1.5 - y, steps * 0.08, steps * 0.08)
      }
      if (calories) {
        c = p.color(allSummaries.colours.calories)
        p.noStroke()
        p.fill(c)
        p.ellipse(x, y, calories * 0.6, calories * 0.6)
      }
      if (ascent) {
        c = p.color(allSummaries.colours.ascent)
        p.fill(c)
        p.triangle(0, height, width, height, width, ascent * 10)
      }
      if (descent) {
        c = p.color(allSummaries.colours.descent)
        p.fill(c)
        p.triangle(0, descent * 10, width, height, 0, height)
      }
      if (heart_rate) {
        c = p.color(allSummaries.colours.heart_rate)
        p.fill(c)
        p.rect(width - heart_rate, y, heart_rate, 20)
      }
      if (distance) {
        c = p.color(allSummaries.colours.distance)
        p.fill(c)
        p.rect(width - x, 0, 30, distance * 50)
      }
    }
  }

  const keyValues = []
  const notInclude = new Set(["nikefuel", "speed", "rpe", "stars"])
  Object.keys(allSummaries.colours).forEach(key => {
    if (!notInclude.has(key)) {
      keyValues.push(
        <>
          <div className="col-xs-4 col-sm-2">
            <h4 className="is-dark-blue">{prettifyKey(key)}</h4>
          </div>
          <div className="col-xs-4 col-sm-2">
            <h4>{allSummaries[key].toFixed(1)}</h4>
          </div>
          <div className="col-xs-4 col-sm-2">
            <h4 style={{ color: allSummaries.colours[key] }}>
              {allSummaries.colours[key]}
            </h4>
          </div>
        </>
      )
    }
  })
  return (
    <>
      <div
        className="shadow"
        style={{ height: 496.1, width: 350.8, margin: "auto" }}
      >
        <P5Wrapper sketch={sketch} />
      </div>
      <h2 className="text-align-center">
        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
      </h2>
      <div className="row text-align-center">{keyValues}</div>
    </>
  )
}

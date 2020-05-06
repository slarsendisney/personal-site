import React from "react"
import { differenceInDays, eachDay } from "date-fns"

export default () => {
  const daysInLockDown = () => {
    return differenceInDays(new Date(), new Date(2020, 2, 16))
  }
  return (
    <div className="is-red-bg is-white-always pad-5 row">
      <div className="col-xs-12 col-md-3">
        <h1 className="is-hero-menu ">Life In Lockdown</h1>
        <div className="line" />
        <p>An infographic poster into my life in a COVID-19 world.</p>
      </div>
      <div className="col-xs-12 col-md-9">
        <div className="row">
          <div className="col-xs-12  col-md-4 flex align-horizontal">
            <h1 className="margin-0 pad-0" style={{ fontSize: 180 }}>
              {daysInLockDown()}
            </h1>
          </div>
          <div className="col-xs-12 col-md-8 flex align-horizontal">
            <p className="margin-0 margin-1-t" style={{ fontSize: 70 }}>
              Days spent in isolation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

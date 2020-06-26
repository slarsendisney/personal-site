import addToMailchimp from "gatsby-plugin-mailchimp"
import { subDays } from "date-fns"
import React, { useState } from "react"
import ConfettiAnimation from "../Animations/ConfettiAnimation"
import { useLocalStorage } from "../../utils/customHooks"
import { Emojione } from "react-emoji-render"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

export default ({ noLabel, cb }) => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [seen, setSeen] = useLocalStorage("dismissed_modal", {
    date: subDays(new Date(), 4).getTime(),
    subscribed: false,
  })
  const handleSubmit = () => {
    addToMailchimp(email).then((data) => {
      if (cb) {
        cb()
      }
      const subLocation =
        typeof window !== "undefined" ? window.location.pathname : "N/A"
      trackCustomEvent({
        category: "Subscribe",
        action: "Click",
        label: `Subscribe Click - ${subLocation}`,
      })
      setSeen({ date: new Date().getTime(), subscribed: true })
      setSubmitted(true)
    })
  }

  return (
    <>
      {submitted && (
        <div className="firework-window">
          <ConfettiAnimation />
        </div>
      )}

      {submitted ? (
        <div
          className="row "
          style={{ marginRight: "auto", marginLeft: "auto" }}
        >
          <div className="col-xs-12 col-sm-11 flex align-vertical pad-7-tb is-grey">
            <h2 className="margin-1-b margin-2-l">
              <Emojione text="🎉 " />
              Awesome, you're all signed up!{" "}
            </h2>
            <p className="margin-0 margin-2-l">
              Thanks for showing interest in my content.
            </p>
          </div>
        </div>
      ) : (
        <div className="row margin-3-lr">
          {!noLabel && (
            <div className="col-xs-12 ">
              <p className="margin-1-tb margin-0">
                Want to know when I post something new? Subscribe to my
                newsletter. <Emojione text="🚀" />
              </p>
            </div>
          )}

          <div className="col-xs-12 col-sm-6 flex align-vertical">
            <input
              type="text"
              name="email"
              label="email-input"
              placeholder="Enter your email"
              className="input pad-3-tb "
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 flex align-vertical">
            <button
              className="bubble-button pad-3 margin-3-tb border-radius"
              type="button"
              aria-label="Subscribe"
              onClick={() => handleSubmit()}
              style={{ width: "100%" }}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      )}
    </>
  )
}

import addToMailchimp from "gatsby-plugin-mailchimp"
import React, { useState } from "react"
import ConfettiAnimation from "../Animations/ConfettiAnimation"

export default () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const handleSubmit = () => {
    addToMailchimp(email).then((data) => {
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
          <div className="col-xs-12 col-sm-11 flex align-vertical pad-7-tb">
            <h3 className="is-grey">
              {" "}
              🎉 Awesome, you're all signed up! Thanks for showing interest in
              my content.{" "}
            </h3>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-xs-12 ">
            <p>
              Want to know when I post something new? Subscribe to my
              newsletter.{" "}
              <span role="img" aria-label="Rocket">
                🚀
              </span>
            </p>
          </div>
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
          <div className="col-xs-12 col-sm-6 flex align-vertical">
            <button
              className="bubble-button pad-3 margin-3-tb"
              type="button"
              aria-label="Subscribe"
              onClick={() => handleSubmit()}
              style={{ width: "100%" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      )}
    </>
  )
}

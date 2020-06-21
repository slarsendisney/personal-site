import React, { useState, useEffect, useRef } from "react"
import { subDays, differenceInDays, differenceInHours } from "date-fns"
import Subscribe from "./Subscribe"
import { Emojione } from "react-emoji-render"
import { useLocalStorage } from "../../utils/customHooks"

function useOutsideAlerter(ref, fn) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, fn])
}

function viewedArticlesToday(viewed) {
  const currentDate = new Date()
  let count = 0
  Object.keys(viewed).forEach((key) => {
    const articleViewedOn = new Date(viewed[key])
    if (differenceInHours(articleViewedOn, currentDate) < 24) {
      count++
    }
  })
  return count
}

export default () => {
  const [subscribed, setSubscribed] = useState(false)
  const [fade, setFade] = useState(false)
  const [visible, setVisible] = useState(false)
  const modalRef = useRef(null)

  const [viewed, setViewed] = useLocalStorage("viewed", {})
  const [seen, setSeen] = useLocalStorage("dismissed_modal", {
    date: subDays(new Date(), 4).getTime(),
    subscribed: false,
  })
  useEffect(() => {
    const pathArray =
      typeof window !== "undefined" &&
      window.location.pathname.includes("articles")
        ? window.location.pathname.split("/")
        : ["test"]

    const contentID =
      pathArray[pathArray.length - 1].length > 0
        ? pathArray[pathArray.length - 1]
        : pathArray[pathArray.length - 2]
    setViewed({ ...viewed, [contentID]: new Date().getTime() })

    if (
      viewedArticlesToday(viewed) > 1 &&
      !seen.subscribed &&
      differenceInDays(new Date(), new Date(seen.date)) > 2
    ) {
      setVisible(true)
    }
  }, [])
  const hitTheButton = () => {
    setSubscribed(true)
    setTimeout(() => setFade(true), 3500)
    setTimeout(() => setVisible(false), 4500)
  }
  const notInterested = () => {
    setSeen({ date: new Date().getTime(), subscribed: false })
    setFade(true)
    setTimeout(() => setVisible(false), 1000)
  }

  useOutsideAlerter(modalRef, notInterested)

  if (!visible) {
    return <div />
  }
  return (
    <div
      className={`modal-background flex align-horizontal align-vertical ${
        fade ? "fade-out" : ""
      }`}
    >
      <div
        className={`modal is-white-bg margin-3 pad-1 border-radius ${
          fade ? "fade-out" : ""
        }`}
        ref={modalRef}
      >
        {!subscribed && (
          <div className="row margin-3-lr">
            <div className="col-xs-10 col-sm-11 ">
              <h2 className="margin-0-b">
                <Emojione text={"👋 "} />
                You seem to be enjoying my content!
              </h2>
            </div>
            <div className="col-xs-2 col-sm-1 " style={{ textAlign: "right" }}>
              <button onClick={notInterested}>
                <h2
                  className={`las la-times-circle link grow margin-1-b margin-4-t`}
                  style={{ fontSize: 30 }}
                ></h2>
              </button>
            </div>
            <div className="col-xs-12">
              <p>
                I write new articles every week that I hope inspire you to build
                new things. If you're enjoying my content and want to hear when
                I post something new, feel free to subscribe to my newsletter!
              </p>
              <p>
                <strong>
                  Never any spam and you can unsubscribe at any time.
                </strong>
              </p>
              <div className="line-sm margin-5-t margin-3-b opacity-10" />
            </div>
          </div>
        )}

        <Subscribe noLabel={true} cb={hitTheButton} />
      </div>
    </div>
  )
}

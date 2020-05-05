import React, { useEffect, useState, Fragment } from "react"

export default ({ target }) => {
  const [readingProgress, setReadingProgress] = useState(0)
  const [show, setShow] = useState(false)
  const scrollListener = () => {
    if (!target.current) {
      return
    }

    const element = target.current
    const totalHeight =
      element.clientHeight - element.offsetTop - window.innerHeight
    const windowScrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0

    const toShow = windowScrollTop >= 80
    if (toShow != show) {
      setShow(toShow)
    }
    if (windowScrollTop === 0) {
      return setReadingProgress(0)
    }

    if (windowScrollTop > totalHeight) {
      return setReadingProgress(100)
    }

    setReadingProgress((windowScrollTop / totalHeight) * 100)
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollListener)
    return () => window.removeEventListener("scroll", scrollListener)
  })
  if (!show) {
    return <Fragment />
  }
  return (
    <div
      className={`reading-progress-bar`}
      style={{
        width: `${readingProgress}%`,
        top: 0,
      }}
    />
  )
}

import React, { useEffect } from "react"
import { navigate } from "gatsby"
import Animation from "../components/animation"

export default () => {
  useEffect(() => {
    setTimeout(() => {
      navigate("/start")
    }, 2700)
  }, [])
  return (
    <div className="is-blue-bg" style={{ height: "100vh" }}>
      <Animation />
    </div>
  )
}

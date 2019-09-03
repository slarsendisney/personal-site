import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"
import Animation from "../components/animation"

export default () => {
  useEffect(() => {
    console.log("In effect")
    setTimeout(() => {
      console.log("Navigate")
      navigate("/start")
    }, 2700)
  }, [])
  return (
    <div className="is-pink-bg" style={{ height: "100vh" }}>
      <Animation />
    </div>
  )
}

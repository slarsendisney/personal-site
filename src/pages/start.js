import React, { useEffect } from "react"
import { navigate } from "gatsby"
import Animation from "../components/animation"
import SEO from "../components/seo"

export default () => {
  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 2700)
  }, [])
  return (
    <div className="is-blue-bg" style={{ height: "100vh" }}>
      <SEO title="Welcome" />
      <Animation />
    </div>
  )
}

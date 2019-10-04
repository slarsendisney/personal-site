import React, { useEffect } from "react"
import { Link, navigate } from "gatsby"

export default () => {
  useEffect(() => {
    navigate("/lost")
  }, [])
  return <div />
}

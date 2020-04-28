/** @jsx jsx */
import { jsx } from "theme-ui"
import React, { Fragment } from "react"
import { navigate } from "gatsby"
import ReactTooltip from "react-tooltip"
import Context from "../context"
import useDeck from "../hooks/use-deck"
import useSwipe from "../hooks/use-swipe"
import { modes } from "../constants"
import Logo from "../images/Logo.svg"
import Question from "../images/question.svg"
import SEO from "./seo"

export const Slide = ({ slide, index, preview, frontmatter, ...props }) => {
  const outer = useDeck()
  const swipeProps = useSwipe()
  const context = {
    ...outer,
    index,
    preview,
  }

  return (
    <Context.Provider value={context}>
      <SEO frontmatter={frontmatter} />
      <ReactTooltip className="info-tooltip" place="right" />
      <div
        {...(!preview ? swipeProps : {})}
        className="pres-layout light-mode"
        sx={{
          boxSizing: "border-box",
          width: "100%",
          height: context.mode === modes.print ? "100vh" : "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          color: "text",
          bg: "background",
          variant: "styles.Slide",
        }}
      >
        {slide}

        <button
          style={{ position: "fixed", bottom: 20, right: 30 }}
          onClick={() => navigate("/presentations")}
        >
          <img src={Logo} style={{ height: 20 }} />
        </button>
        <div
          style={{ position: "fixed", bottom: 10, left: 20 }}
          data-tip={`Use arrow keys or swipe to navigate between slides. Press 'esc' or click my logo to exit.`}
        >
          <img src={Question} style={{ height: 30 }} />
        </div>
      </div>
    </Context.Provider>
  )
}

export default Slide

import React, { useEffect } from "react"
import { Router, globalHistory } from "@reach/router"
import { connect } from "react-redux"
import { Global } from "@emotion/core"
import { ThemeProvider } from "theme-ui"
import { Helmet } from "react-helmet"
import get from "lodash.get"
import merge from "lodash.merge"
import Modal from "react-modal"
import useKeyboard from "../hooks/use-keyboard"
import useStorage from "../hooks/use-storage"
import useDeck from "../hooks/use-deck"
import Context from "../context"
import Wrapper from "./wrapper"
import Slide from "./slide"
import { modes } from "../constants"
import Presenter from "./presenter"
import { jump } from "../navigate"
import Overview from "./overview"
import Grid from "./grid"

const Keyboard = ({ verified, update }) => {
  useKeyboard(verified, update)
  return false
}

const Storage = () => {
  useStorage()
  return false
}

const Print = ({ slides }) => {
  const outer = useDeck()
  const context = {
    ...outer,
    mode: modes.print,
  }

  return (
    <Context.Provider value={context}>
      {slides.map((slide, i) => (
        <Slide key={i} slide={slide} preview />
      ))}
    </Context.Provider>
  )
}

const getIndex = () => {
  const { pathname } = globalHistory.location
  const paths = pathname.split("/")
  const n = Number(paths[paths.length - 1])
  const index = isNaN(n) ? 0 : n
  return index
}

const mergeThemes = (...themes) =>
  themes.reduce(
    (acc, theme) =>
      typeof theme === "function" ? theme(acc) : merge(acc, theme),
    {}
  )

const DefaultMode = ({ children }) => <React.Fragment children={children} />

export const Deck = ({
  slides = [],
  pageContext: { title, slug },
  theme = {},
  themes = [],
  follow,
  presentation,
  livePresenter,
  changePresPosOnServer,
  verified,
  ...props
}) => {
  const outer = useDeck()
  const index = getIndex()

  const head = slides.head.children

  const { components, ...mergedTheme } = mergeThemes(theme, ...themes)

  const context = {
    ...outer,
    slug,
    length: slides.length,
    index,
    steps: get(outer, `metadata.${index}.steps`),
    notes: get(outer, `metadata.${index}.notes`),
    theme: mergedTheme,
  }

  let Mode = DefaultMode

  if (
    !verified &&
    livePresenter &&
    follow &&
    presentation &&
    window.location.pathname.includes(presentation.deck) &&
    window.location.pathname !==
      presentation.deck + "/slides/" + presentation.slide
  ) {
    jump(slug, presentation.slide)
  }
  if (verified && presentation && index !== presentation.slide) {
    changePresPosOnServer(index)
  }

  switch (context.mode) {
    case modes.presenter:
      Mode = Presenter
      break
    case modes.overview:
      Mode = Overview
      break
    case modes.grid:
      Mode = Grid
      break
    default:
      break
  }
  Modal.setAppElement("#___gatsby")

  return (
    <>
      <Context.Provider value={context}>
        <ThemeProvider components={components} theme={mergedTheme}>
          <Global
            styles={{
              body: {
                overflow: context.mode === modes.normal ? "hidden" : null,
              },
            }}
          />
          <Keyboard verified={verified} update={changePresPosOnServer} />
          <Storage />
          <Wrapper>
            <Mode slides={slides}>
              <Router
                basepath={slug}
                style={{
                  height: "100%",
                }}
              >
                <Slide
                  index={0}
                  path="/"
                  slide={slides[0]}
                  length={slides.length}
                  frontmatter={props._frontmatter}
                  activeDeck={
                    presentation
                      ? presentation.deck === props._frontmatter.path
                      : false
                  }
                />
                {slides.map((slide, i) => (
                  <Slide
                    key={i}
                    index={i}
                    path={i + "/*"}
                    slide={slide}
                    length={slides.length}
                    frontmatter={props._frontmatter}
                    activeDeck={
                      presentation
                        ? presentation.deck === props._frontmatter.path
                        : false
                    }
                  />
                ))}
              </Router>
            </Mode>
          </Wrapper>
        </ThemeProvider>
      </Context.Provider>
    </>
  )
}

const mapStateToProps = ({ presentation, follow, livePresenter, verified }) => {
  return { presentation, follow, livePresenter, verified }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changePresPosOnServer: (value) =>
      dispatch({ type: "server/updateIndex", data: value }),
  }
}

const ConnectedDeck =
  typeof window !== `undefined`
    ? connect(mapStateToProps, mapDispatchToProps)(Deck)
    : Slide

export default ConnectedDeck

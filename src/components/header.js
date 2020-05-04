/* eslint-disable jsx-a11y/heading-has-content*/

import { Link } from "gatsby"
import React, { useRef, useEffect, useState } from "react"
import { Emojione } from "react-emoji-render"
import useDarkMode from "use-dark-mode"
import Logo from "../images/Logo.svg"
import LogoDark from "../images/Logo-dark.svg"
import LogoAnimation from "./Animations/LogoAnimation"
import SmoothCollapse from "react-smooth-collapse"
import sections from "../data/nav-sections.json"
import { NavLinkSmall } from "./Root/NavLink"

function useOutsideAlerter(ref, fn) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        fn(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref, fn])
}

export default ({ location }) => {
  const darkMode = useDarkMode(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setMenuOpen)

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (menuOpen) {
        setMenuOpen(false)
      }
    })
  })

  const delay = (fn) => {
    setTimeout(() => fn(), 300)
  }

  return (
    // <VisibilitySensor onChange={onChange} partialVisibility={true}>
    <div
      className="is-white-bg pad-5 "
      style={{ zIndex: 100 }}
      ref={wrapperRef}
    >
      <div className="row flex padding-0-tb container-small">
        <div className="col-xs-9 flex">
          <Link
            to="/"
            title="home"
            className=" align-horizontal is-white flex grow-on-hover"
            style={{ textDecoration: "none" }}
          >
            {location.pathname !== "/cv" ? (
              <LogoAnimation darkMode={darkMode.value} />
            ) : (
              <img
                src={!darkMode.value ? Logo : LogoDark}
                alt=""
                style={{ paddingBottom: 2, height: "21.5px" }}
              />
            )}
          </Link>
        </div>
        <div
          className="col-xs-3 flex text-align-right"
          style={{ justifyContent: "flex-end", alignItems: "center" }}
        >
          <button type="button" onClick={() => setMenuOpen(!menuOpen)}>
            <h2
              className={`las ${
                !menuOpen ? "la-bars" : "la-times-circle"
              } link margin-0`}
              style={{ fontSize: 30 }}
            ></h2>
          </button>
        </div>
        <div className="col-xs-12">
          <SmoothCollapse expanded={menuOpen} className="">
            <div className="row margin-5-t">
              <div className="col-xs-12 col-md-2 ">
                {sections.slice(0, 2).map((item) => (
                  <NavLinkSmall {...item} key={item.label} />
                ))}
              </div>

              <div className="col-xs-12 col-md-2 ">
                {sections.slice(2, 4).map((item) => (
                  <NavLinkSmall {...item} key={item.label} />
                ))}
              </div>
              <div className="col-xs-12 col-md-2 ">
                {sections.slice(4, 6).map((item) => (
                  <NavLinkSmall {...item} key={item.label} />
                ))}
              </div>
              <div className="col-xs-12 col-md-2 ">
                <NavLinkSmall
                  {...{
                    label: "🔎 Search",
                    type: "Boilerplates",
                    url: "/search",
                  }}
                />
                {darkMode.value ? (
                  <button
                    type="button"
                    aria-label="light mode"
                    onClick={() => {
                      setMenuOpen(!menuOpen)
                      delay(darkMode.disable)
                    }}
                  >
                    <h3 className="margin-3-b margin-0-t link-bar pad-1-b  special-header-text">
                      <Emojione text="☀️" /> Light Mode
                    </h3>
                  </button>
                ) : (
                  <button
                    type="button"
                    aria-label="dark mode"
                    onClick={() => {
                      setMenuOpen(!menuOpen)
                      delay(darkMode.enable)
                    }}
                  >
                    <h3 className="margin-3-b margin-0-t link-bar pad-1-b  special-header-text">
                      <Emojione text="🌙" /> Dark Mode
                    </h3>
                  </button>
                )}
              </div>
            </div>
          </SmoothCollapse>
        </div>
      </div>
    </div>
  )
}

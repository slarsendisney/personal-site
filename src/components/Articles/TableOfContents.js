import React from "react"
import { useScrollYPosition } from "react-use-scroll-position"
import { useWindowSize } from "../../utils/customHooks"
import AnchorLink from "react-anchor-link-smooth-scroll"

export default ({ tableOfContents, currentHeading }) => {
  const size = useWindowSize()
  const scrollY = useScrollYPosition()
  if (size.width < 1385 || !tableOfContents.items) {
    return <div />
  }
  const Contents = ({ items }) => {
    return (
      <ul className="article-toc margin-0-t">
        {items.map((item) => (
          <li>
            <AnchorLink offset="30" href={item.url}>
              <p
                className={`article-toc-text pad-1-b margin-2-t margin-0-b link-bar-sm margin-0-b ${
                  currentHeading === item.title ? "is-special-blue" : ""
                }`}
              >
                {item.title}
              </p>
            </AnchorLink>
            {item.items && <Contents items={item.items} />}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      style={
        scrollY <= 290
          ? {
              position: "absolute",
              top: Math.max(310, scrollY + 20),
              pointerEvents: "none",
            }
          : {
              position: "fixed",
              top: 20,
            }
      }
      className="flex "
    >
      <div className="container-article" style={{ width: "100vw" }}></div>
      <div
        className="is-white-bg is-black border-radius pad-4-lr pad-1-tb flex"
        style={{
          flexDirection: "column",
          pointerEvents: "auto",
          maxHeight: "90vh",
          overflowY: "scroll",
        }}
      >
        <pre className="margin-0-tb is-grey ">
          <div className="margin-2-b margin-3-t  opacity-60 flex align-horizontal ">
            <i
              className="las la-clipboard-list margin-0 jello-vertical"
              style={{ fontSize: 20 }}
            ></i>
            <h5 className=" margin-0" style={{ fontWeight: "normal" }}>
              {" "}
              TABLE OF CONTENTS
            </h5>
          </div>

          <Contents items={tableOfContents.items} />
        </pre>
      </div>
    </div>
  )
}

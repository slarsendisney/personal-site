import React from "react"
import { Emojione } from "react-emoji-render"
import { useScrollYPosition } from "react-use-scroll-position"
import { useDocument } from "react-firebase-hooks/firestore"
import { useWindowSize, useLocalStorage } from "../../utils/customHooks"

let firebase

if (typeof window !== "undefined") {
  firebase = require("firebase/app")
  require("firebase/firestore")
}

let buttonTypes = [
  { type: "fire", label: "🔥" },
  { type: "popcorn", label: "🍿" },
  { type: "unicorn", label: "🦄" },
  { type: "avo", label: "🥑" },
]
const LikeButton = ({
  type,
  label,
  loading,
  value,
  incrementLikes,
  decrementLikes,
  selected,
}) => {
  return (
    <div
      className={`flex align-vertical margin-2-b margin-1-lr`}
      style={{ width: 45 }}
    >
      <button
        className=""
        onClick={() =>
          selected(type) ? decrementLikes(type) : incrementLikes(type)
        }
      >
        <h1
          className={`margin-0 border-radius pad-1-lr ${
            selected(type) ? "is-yellow-bg" : ""
          }`}
        >
          <Emojione text={label} />
        </h1>
      </button>
      <p className="margin-0 opacity-60 text-align-center">
        {!loading
          ? value.data() && value.data()[type]
            ? value.data()[type]
            : 0
          : "..."}
      </p>
    </div>
  )
}

export default () => {
  const size = useWindowSize()
  const scrollY = useScrollYPosition()
  const pathArray =
    typeof window !== "undefined" &&
    window.location.pathname.includes("articles")
      ? window.location.pathname.split("/")
      : ["test"]

  const contentID =
    pathArray[pathArray.length - 1].length > 0
      ? pathArray[pathArray.length - 1]
      : pathArray[pathArray.length - 2]
  const [value, loading, error] =
    typeof window !== "undefined"
      ? useDocument(firebase.firestore().doc(`likes/${contentID}`))
      : [0, true, false]
  const [likes, setLikes] = useLocalStorage("likes", {})

  const incrementLikes = (type) => {
    let contentLikes = likes && likes[contentID] ? likes[contentID] : {}
    if (!loading && !error && (!contentLikes[type] || contentLikes[type] < 1)) {
      setLikes({ ...likes, [contentID]: { ...contentLikes, [type]: 1 } })
      firebase
        .firestore()
        .collection("likes")
        .doc(contentID)
        .set(
          {
            [type]:
              value.data() && value.data()[type] ? value.data()[type] + 1 : 1,
          },
          { merge: true }
        )
    }
  }
  const decrementLikes = (type) => {
    let contentLikes = likes && likes[contentID] ? likes[contentID] : {}
    if (!loading && !error && contentLikes[type]) {
      setLikes({ ...likes, [contentID]: { ...contentLikes, [type]: 0 } })
      firebase
        .firestore()
        .collection("likes")
        .doc(contentID)
        .set(
          {
            [type]: value.data()[type] - 1,
          },
          { merge: true }
        )
    }
  }
  const isSelected = (type) =>
    likes &&
    likes[contentID] &&
    (likes[contentID][type] || likes[contentID][type] > 0)

  const Buttons = buttonTypes.map((item) => (
    <LikeButton
      type={item.type}
      label={item.label}
      loading={loading}
      value={value}
      contentID={contentID}
      incrementLikes={incrementLikes}
      decrementLikes={decrementLikes}
      selected={isSelected}
    />
  ))

  if (size.width < 1325) {
    return (
      <div
        className="is-white-bg border-radius flex pad-2-t pad-1-lr"
        style={{
          justifyContent: "center",
          width: "fit-content",
          margin: "auto",
        }}
      >
        {Buttons}
      </div>
    )
  }

  return (
    <div
      style={{
        position: "fixed",
        top: Math.max(20, 335 - scrollY),
        marginLeft: -100,
      }}
    >
      {!error && (
        <div
          className="is-white-bg border-radius pad-1-t margin-3-l flex"
          style={{ flexDirection: "column" }}
        >
          {Buttons}
        </div>
      )}
    </div>
  )
}

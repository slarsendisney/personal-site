import React, { useEffect, useState } from "react"
import { useScrollYPosition } from "react-use-scroll-position"
import { useDocument, useCollection } from "react-firebase-hooks/firestore"
import firebase from "gatsby-plugin-firebase"

function useWindowSize() {
  const isClient = typeof window === "object"

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  return windowSize
}
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)

      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.log(error)
    }
  }

  return [storedValue, setValue]
}

let buttonTypes = [
  { type: "fire", label: "🔥" },
  { type: "bolt", label: "⚡️" },
  { type: "unicorn", label: "🦄" },
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
        className="grow"
        onClick={() =>
          selected(type) ? decrementLikes(type) : incrementLikes(type)
        }
      >
        <h1
          className={`margin-0 border-radius pad-1-lr ${
            selected(type) ? "is-yellow-bg" : ""
          }`}
        >
          {label}
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
  const pathArray = window.location.pathname.split("/")
  const contentID = pathArray[pathArray.length - 1]
  const [value, loading, error] = useDocument(
    firebase.firestore().doc(`likes/${contentID}`)
  )
  const [likes, setLikes] = useLocalStorage("likes", {})

  const incrementLikes = (type) => {
    let contentLikes = likes && likes[contentID] ? likes[contentID] : {}
    if (!loading && (!contentLikes[type] || contentLikes[type] < 1)) {
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
    if (!loading && contentLikes[type]) {
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
        className="is-white-bg border-radius flex pad-2-t pad-2-lr"
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
          className="is-white-bg border-radius pad-1-lr pad-2-t margin-3-l flex"
          style={{ flexDirection: "column" }}
        >
          {Buttons}
        </div>
      )}
    </div>
  )
}

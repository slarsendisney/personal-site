import React, { useState } from "react";
import { Emojione } from "react-emoji-render";
import PropTypes from "prop-types";
import { useDocumentOnce } from "react-firebase-hooks/firestore";
import { useLocalStorage } from "../../utils/customHooks";
import urls from "../../data/urls.json";
let firebase;

if (typeof window !== "undefined") {
  firebase = require("firebase/app");
  require("firebase/firestore");
}

let buttonTypes = [
  { type: "fire", label: "🔥" },
  { type: "popcorn", label: "🍿" },
  { type: "unicorn", label: "🦄" },
  { type: "avo", label: "🥑" },
];

const LikeButton = ({
  type,
  label,
  loading,
  value,
  normalisedValue,
  incrementLikes,
  decrementLikes,
  error,
  selected,
}) => {
  return (
    <div className={`flex flex-col justify-center items-center mb-2 mx-1`}>
      <button
        className=""
        onClick={() =>
          selected(type) ? decrementLikes(type) : incrementLikes(type)
        }
      >
        <h1
          className={`m-0 rounded px-1 py-2 text-3xl ${
            selected(type) ? "bg-accent jello-vertical" : ""
          }`}
        >
          <Emojione text={label} />
        </h1>
      </button>
      <p className="text-base margin-0 opacity-60 text-align-center">
        {!loading && !error
          ? value.data() && value.data()[type]
            ? value.data()[type] + normalisedValue
            : 0 + normalisedValue
          : "..."}
      </p>
    </div>
  );
};

LikeButton.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
  normalisedValue: PropTypes.number.isRequired,
  incrementLikes: PropTypes.func.isRequired,
  decrementLikes: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  selected: PropTypes.bool.isRequired,
};

const StickyLike = () => {
  const pathArray =
    typeof window !== "undefined" &&
    window.location.pathname.includes("articles")
      ? window.location.pathname.split("/")
      : ["test"];

  const contentID =
    pathArray[pathArray.length - 1].length > 0
      ? pathArray[pathArray.length - 1]
      : pathArray[pathArray.length - 2];
  const [value, loading, error] =
    typeof window !== "undefined"
      ? useDocumentOnce(firebase.firestore().doc(`likes/${contentID}`))
      : [0, true, false];
  const [normalisedValues, setNormalisedValues] = useState(
    buttonTypes.reduce((acc, cur) => {
      acc[cur.type] = 0;
      return acc;
    }, {})
  );
  const [likes, setLikes] = useLocalStorage("likes", {});

  const incrementLikes = (type) => {
    let contentLikes = likes && likes[contentID] ? likes[contentID] : {};
    if (!loading && !error && (!contentLikes[type] || contentLikes[type] < 1)) {
      fetch(`${urls.api}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentID, type }),
      });
      setLikes({ ...likes, [contentID]: { ...contentLikes, [type]: 1 } });
      setNormalisedValues({
        ...normalisedValues,
        [type]: normalisedValues[type] + 1,
      });
    }
  };
  const decrementLikes = (type) => {
    let contentLikes = likes && likes[contentID] ? likes[contentID] : {};
    if (!loading && !error && contentLikes[type]) {
      setLikes({ ...likes, [contentID]: { ...contentLikes, [type]: 0 } });
      setNormalisedValues({
        ...normalisedValues,
        [type]: normalisedValues[type] - 1,
      });
    }
  };
  const isSelected = (type) =>
    likes &&
    likes[contentID] &&
    (likes[contentID][type] || likes[contentID][type] > 0);
  const Buttons = buttonTypes.map((item) => (
    <LikeButton
      key={item.type}
      type={item.type}
      label={item.label}
      loading={loading}
      error={error}
      value={value}
      normalisedValue={normalisedValues[item.type]}
      contentID={contentID}
      incrementLikes={incrementLikes}
      decrementLikes={decrementLikes}
      selected={isSelected}
    />
  ));

  return <>{Buttons}</>;
};

export default StickyLike;

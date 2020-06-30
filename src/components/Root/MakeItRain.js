import React from "react"
import EmojiThanks from "./MakeItRain/EmojiThanks"

const maxHeight = typeof document !== `undefined` ? window.innerHeight : 0
const maxWidth = typeof window !== `undefined` ? window.innerWidth : 0

const getRandomX = () => {
  return Math.floor(Math.random() * Math.floor(maxWidth))
}
const getRandomY = () => {
  return Math.floor(Math.random() * Math.floor(maxHeight))
}

export default () => (
  <>
    {[...Array(20)].map((e, i) => (
      <EmojiThanks
        x={getRandomX()}
        y={getRandomY()}
        index={i}
        key={`emoji ${i}`}
      />
    ))}
  </>
)

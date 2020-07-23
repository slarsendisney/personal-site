import React from "react"
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts"
const data = [
  {
    name: "Audio Only",
    GB: 0.072,
  },
  {
    name: "SD Video",
    GB: 0.7,
  },
  {
    name: "HD Video",
    GB: 2.5,
  },
]

export default () => {
  return (
    <ResponsiveContainer
      width="90%"
      height="90%"
      maxHeight="400px"
      maxWidth="800px"
    >
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 60, bottom: 50 }}
      >
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} unit="GB" />
        <Tooltip />
        <Bar dataKey="GB" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

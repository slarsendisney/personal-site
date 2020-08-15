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
    name: "Audio",
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

const dataWithGatsby = [
  {
    name: "Audio",
    GB: 0.072,
  },
  {
    name: "Our Solution",
    GB: 0.092,
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

export default ({ withGatsby }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height="90%"
      maxHeight="400px"
      maxWidth="900px"
    >
      <BarChart
        data={withGatsby ? dataWithGatsby : data}
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

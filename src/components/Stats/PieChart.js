import React from "react"
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts"
import CustomLabel from "./CustomLabel"

const COLORS = ["#ea4e68", "#FE788E", "#FEB0BD", "#B43046"]

export default ({ data }) => (
  <ResponsiveContainer>
    <PieChart>
      <Pie
        dataKey="value"
        data={data}
        fill="#8884d8"
        labelLine={false}
        label={(e) => <CustomLabel {...e} data={data} />}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>
)

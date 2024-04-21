import React from "react";
import styles from "./TopExpenses.module.css";
import {
  BarChart,
  Bar,
  YAxis,
  ResponsiveContainer,
  XAxis,
} from "recharts";

const data = [
  {
    name: "Entertainment",
    value: 4000,
  },
  {
    name: "Food",
    value: 3000,
  },
  {
    name: "Travel",
    value: 2000,
  },
];

export default function TopExpenses() {
  return (
    <div className={styles.wrapper}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" barSize={30}>
        <YAxis
            dataKey="name"
            type="category"
            width={105}
            style={{ textOverflow: "ellipsis" }}
          />
          <XAxis dataKey="value" type="number" />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

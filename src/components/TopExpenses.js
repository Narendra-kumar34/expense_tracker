import React from "react";
import styles from "./TopExpenses.module.css";
import {
  BarChart,
  Bar,
  YAxis,
  ResponsiveContainer,
  XAxis,
} from "recharts";

export default function TopExpenses({ expensesArr }) {
  const entertainmentValue = expensesArr
    .filter((item) => item.category === "entertainment")
    .reduce(
      (accumulator, currItem) => accumulator + parseFloat(currItem.price),
      0
    );
  const foodValue = expensesArr
    .filter((item) => item.category === "food")
    .reduce(
      (accumulator, currItem) => accumulator + parseFloat(currItem.price),
      0
    );
  const travelValue = expensesArr
    .filter((item) => item.category === "travel")
    .reduce(
      (accumulator, currItem) => accumulator + parseFloat(currItem.price),
      0
    );
  const data = [
    { name: "Entertainment", value: (entertainmentValue || 0) },
    { name: "Food", value: (foodValue || 0) },
    { name: "Travel", value: (travelValue || 0) },
  ];

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

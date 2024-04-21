import React from "react";
import styles from "./Piechart.module.css";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#FF9304", "#A000FF", "#FDE006"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Piechart({ expensesArr }) {
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
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

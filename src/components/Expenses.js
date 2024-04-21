import React, { useState } from "react";
import styles from "./Expenses.module.css";
import AddEditExpensesModal from "./AddEditExpensesModal";

export default function Expenses({
  setWalletBalance,
  expensesArr,
  setExpensesArr,
}) {
  const expensesFromLocalStorage = localStorage.getItem("expenses");
  const initialExpenses = expensesFromLocalStorage
    ? expensesArr.reduce(
        (accumulator, currVal) => accumulator + parseFloat(currVal.price),
        0
      )
    : 0;
  const [expenses, setExpenses] = useState(parseInt(initialExpenses));
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        Expenses: <span className={styles.currency}>₹{expenses}</span>
      </div>
      <AddEditExpensesModal
        type="add"
        expenses={expenses}
        setExpenses={setExpenses}
        setWalletBalance={setWalletBalance}
        setExpensesArr={setExpensesArr}
      />
    </div>
  );
}

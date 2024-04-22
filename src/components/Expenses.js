import React from "react";
import styles from "./Expenses.module.css";
import AddEditExpensesModal from "./AddEditExpensesModal";

export default function Expenses({
  setWalletBalance,
  expensesArr,
  setExpensesArr,
  expenses,
  setExpenses
}) {
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
        expensesArr={expensesArr}
        setExpensesArr={setExpensesArr}
      />
    </div>
  );
}

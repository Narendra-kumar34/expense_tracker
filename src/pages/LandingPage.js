import React, { useState } from "react";
import styles from "./LandingPage.module.css";
import ExpenseTracker from "../components/ExpenseTracker";
import RecentTransactions from "../components/RecentTransactions";
import TopExpenses from "../components/TopExpenses";

export default function LandingPage() {
  const [walletBalance, setWalletBalance] = useState(
    localStorage.getItem("balance")
      ? parseInt(localStorage.getItem("balance"))
      : 5000
  );
  if(!localStorage.getItem("balance")) {
    localStorage.setItem("balance", "5000");
  }
  const expensesFromLocalStorage = localStorage.getItem("expenses");
  const [expensesArr, setExpensesArr] = useState(
    JSON.parse(expensesFromLocalStorage) || []
  );
  const initialExpenses = expensesFromLocalStorage
    ? JSON.parse(expensesFromLocalStorage).reduce(
        (accumulator, currVal) => accumulator + parseFloat(currVal.price),
        0
      )
    : 0;
  const [expenses, setExpenses] = useState(parseInt(initialExpenses));

  return (
    <div className={styles.wrapper}>
      <h1>Expense Tracker</h1>
      <ExpenseTracker
        walletBalance={walletBalance}
        setWalletBalance={setWalletBalance}
        expensesArr={expensesArr}
        setExpensesArr={setExpensesArr}
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <div className={styles.transactionsWrapper}>
        <div className={styles.recentTransactionsWrapper}>
          <h2 style={{ fontStyle: "italic" }}>Recent Transactions</h2>
          <RecentTransactions expensesArr={expensesArr} setExpensesArr={setExpensesArr} setWalletBalance={setWalletBalance} expenses={expenses} setExpenses={setExpenses} />
        </div>
        <div className={styles.topExpensesWrapper}>
          <h2 style={{ fontStyle: "italic" }}>Top Expenses</h2>
          <TopExpenses expensesArr={expensesArr} />
        </div>
      </div>
    </div>
  );
}

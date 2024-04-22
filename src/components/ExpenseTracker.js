import React from "react";
import styles from "./ExpenseTracker.module.css";
import WalletBalance from "./WalletBalance";
import Expenses from "./Expenses";
import Piechart from "./Piechart";

export default function ExpenseTracker({ walletBalance, setWalletBalance, expensesArr, setExpensesArr, expenses, setExpenses }) {
    return(
        <div className={styles.wrapper}>
            <WalletBalance walletBalance={walletBalance} setWalletBalance={setWalletBalance} />
            <Expenses setWalletBalance={setWalletBalance} expensesArr={expensesArr} setExpensesArr={setExpensesArr} expenses={expenses} setExpenses={setExpenses} />
            <Piechart expensesArr={expensesArr} />
        </div>
    )
}
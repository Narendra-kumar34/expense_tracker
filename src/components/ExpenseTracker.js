import React from "react";
import styles from "./ExpenseTracker.module.css";
import WalletBalance from "./WalletBalance";
import Expenses from "./Expenses";
import Piechart from "./Piechart";
import { useState } from "react";

export default function ExpenseTracker() {
    const [walletBalance, setWalletBalance] = useState(localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 5000);
    const expensesFromLocalStorage = localStorage.getItem("expenses");
    const [expensesArr, setExpensesArr] = useState(JSON.parse(expensesFromLocalStorage));
    return(
        <div className={styles.wrapper}>
            <WalletBalance walletBalance={walletBalance} setWalletBalance={setWalletBalance} />
            <Expenses setWalletBalance={setWalletBalance} expensesArr={expensesArr} setExpensesArr={setExpensesArr} />
            <Piechart expensesArr={expensesArr} />
        </div>
    )
}
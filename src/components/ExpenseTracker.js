import React from "react";
import styles from "./ExpenseTracker.module.css";
import WalletBalance from "./WalletBalance";
import Expenses from "./Expenses";
import Piechart from "./Piechart";

export default function ExpenseTracker() {
    return(
        <div className={styles.wrapper}>
            <WalletBalance />
            <Expenses />
            <Piechart />
        </div>
    )
}
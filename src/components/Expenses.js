import React from "react";
import styles from "./Expenses.module.css";

export default function Expenses() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.content}>Expenses: <span className={styles.currency}>₹500</span></div>
            <button className={styles.addButton}>+ Add Expense</button>
        </div>
    )
}
import React from "react";
import styles from "./LandingPage.module.css";
import ExpenseTracker from "../components/ExpenseTracker";
import RecentTransactions from "../components/RecentTransactions";

export default function LandingPage() {
    return(
        <div className={styles.wrapper}>
            <h1>Expense Tracker</h1>
            <ExpenseTracker />

        </div>
    )
}
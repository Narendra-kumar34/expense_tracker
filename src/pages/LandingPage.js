import React from "react";
import styles from "./LandingPage.module.css";
import ExpenseTracker from "../components/ExpenseTracker";
import RecentTransactions from "../components/RecentTransactions";
import TopExpenses from "../components/TopExpenses";

export default function LandingPage() {
    return(
        <div className={styles.wrapper}>
            <h1>Expense Tracker</h1>
            <ExpenseTracker />
            <div className={styles.transactionsWrapper}>
                <div className={styles.recentTransactionsWrapper}>
                    <h2 style={{ fontStyle: "italic" }}>Recent Transactions</h2>
                    <RecentTransactions />
                </div>
                <div className={styles.topExpensesWrapper}>
                    <h2 style={{ fontStyle: "italic" }}>Top Expenses</h2>
                    <TopExpenses />
                </div>
            </div>
        </div>
    )
}
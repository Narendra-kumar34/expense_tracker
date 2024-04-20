import React from "react";
import styles from "./WalletBalance.module.css";

export default function WalletBalance() {
    return(
        <div className={styles.wrapper}>
            <div className={styles.content}>Wallet Balance: <span className={styles.currency}>₹4500</span></div>
            <button className={styles.addButton}>+ Add Income</button>
        </div>
    )
}
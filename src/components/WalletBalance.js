import React from "react";
import styles from "./WalletBalance.module.css";
import { useState } from "react";
import AddBalanceModal from "./AddBalanceModal";

export default function WalletBalance() {
  const [balance, setBalance] = useState(
    localStorage.getItem("balance")
      ? parseInt(localStorage.getItem("balance"))
      : 5000
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        Wallet Balance: <span className={styles.currency}>₹{balance}</span>
      </div>
      <AddBalanceModal balance={balance} setBalance={setBalance} />
    </div>
  );
}

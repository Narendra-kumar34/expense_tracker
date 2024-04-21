import React from "react";
import styles from "./WalletBalance.module.css";
import AddBalanceModal from "./AddBalanceModal";

export default function WalletBalance({ walletBalance, setWalletBalance }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        Wallet Balance: <span className={styles.currency}>₹{walletBalance}</span>
      </div>
      <AddBalanceModal balance={walletBalance} setBalance={setWalletBalance} />
    </div>
  );
}

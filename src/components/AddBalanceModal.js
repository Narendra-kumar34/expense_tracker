import React from "react";
import styles from "./AddBalanceModal.module.css";
import { useState } from "react";
import Modal from "react-modal";
import { useSnackbar } from "notistack";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(239, 239, 239, 0.85)",
    borderRadius: "0.75rem"
  },
};

export default function AddBalanceModal({ balance, setBalance }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleAddBalance = () => {
    if (isNaN(incomeAmount) || incomeAmount <= 0) {
        enqueueSnackbar("Income should be a positive number.", { variant: "warning" });
      } else {
        const newBalance = balance + parseFloat(incomeAmount);
        localStorage.setItem("balance", newBalance);
        setBalance(newBalance);
        enqueueSnackbar("Income added to the wallet.", { variant: "success" });
      }
      setIncomeAmount(0);
      closeModal();
  }

  return (
    <div>
      <button className={styles.addButton} onClick={openModal}>
        + Add Income
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 style={{ color: "#000000", marginBottom: "1rem" }}>Add Balance</h1>
        <form className={styles.formWrapper}>
          <input
            type="number"
            placeholder="Income Amount"
            className={styles.incomeAmount}
            onChange={(e) => setIncomeAmount(e.target.value)}
            value={incomeAmount}
          />
          <button className={styles.addBalanceButton} onClick={() => handleAddBalance()}>Add Balance</button>
          <button onClick={closeModal} className={styles.cancelButton}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
}

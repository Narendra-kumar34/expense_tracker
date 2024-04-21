import React from "react";
import styles from "./AddEditExpensesModal.module.css";
import { useState } from "react";
import { useSnackbar } from "notistack";
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(239, 239, 239, 0.85)",
    borderRadius: "0.75rem",
  },
};

export default function AddEditExpensesModal({
  type = "add",
  expenses,
  setExpenses,
  setWalletBalance,
  setExpensesArr
}) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleAddExpense = (e) => {
    e.preventDefault();
    const currBalance = parseInt(localStorage.getItem("balance"));
    if (price <= 0) {
      enqueueSnackbar("Price should be a greater than 0.", {
        variant: "warning",
      });
    } else if (price > currBalance) {
      enqueueSnackbar("Can't spend more than wallet balance.", {
        variant: "warning",
      });
    } else if (category === "") {
      enqueueSnackbar("Please select a category.", { variant: "warning" });
    } else if (date === "") {
      enqueueSnackbar("Please select a date.", { variant: "warning" });
    } else if (new Date(date) > new Date()) {
      enqueueSnackbar("Future date can't be selected.", { variant: "warning" });
    } else {
      const data = {
        title: title,
        price: price,
        category: category,
        date: date,
      };
      const existingExpenses =
        JSON.parse(localStorage.getItem("expenses")) || [];
      existingExpenses.push(data);
      localStorage.setItem("expenses", JSON.stringify(existingExpenses));
      setExpensesArr(existingExpenses);
      const totExpenses = parseFloat(expenses) + parseFloat(price);
      setExpenses(totExpenses);
      const remainingBalance = parseInt(currBalance) - parseInt(price);
      localStorage.setItem("balance", `${remainingBalance}`);
      setWalletBalance(remainingBalance);
      setTitle("");
      setPrice(0);
      setCategory("");
      setDate("");
      closeModal();
    }
  };

  return (
    <div>
      <button className={styles.addButton} onClick={openModal}>
        + Add Expense
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 style={{ color: "#000000", marginBottom: "1rem" }}>Add Expenses</h1>
        <form
          className={styles.formWrapper}
          onSubmit={(e) => handleAddExpense(e)}
        >
          <div className={styles.inputsWrapper}>
            <input
              type="string"
              placeholder="Title"
              className={styles.inputField}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
            <input
              type="number"
              placeholder="Price"
              className={styles.inputField}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>
          <div className={styles.inputsWrapper}>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={styles.selectField}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="entertainment">Entertainment</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
            </select>
            <input
              type="date"
              className={styles.selectField}
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>
          <div className={styles.buttonsWrapper}>
            <input
              className={styles.addExpenseButton}
              value="Add Expense"
              type="submit"
            />
            <button onClick={closeModal} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

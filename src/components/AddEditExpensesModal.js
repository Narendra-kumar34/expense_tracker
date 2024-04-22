import React from "react";
import styles from "./AddEditExpensesModal.module.css";
import { useState } from "react";
import { useSnackbar } from "notistack";
import Modal from "react-modal";
import EditPic from "../assets/EditImg.png";

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
  expensesArr,
  setExpensesArr,
  editId = 0,
}) {
  let editObj;
  if (type === "edit") {
    editObj = JSON.parse(localStorage.getItem("expenses")).find(
      (expense) => expense.id === editId
    );
  } else {
    editObj = {};
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState(editId === 0 ? "" : editObj.title);
  const [price, setPrice] = useState(editId === 0 ? 0 : editObj.price);
  const [category, setCategory] = useState(
    editId === 0 ? "" : editObj?.category || ""
  );
  const [date, setDate] = useState(editId === 0 ? "" : editObj?.date || "");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleAddExpense = (e) => {
    e.preventDefault();
    const currBalance = parseInt(localStorage.getItem("balance"));
    let diffPrice;
    if (editId !== 0) {
      diffPrice = parseInt(price) - parseInt(editObj?.price || 0);
    }
    if (price <= 0) {
      enqueueSnackbar("Price should be a greater than 0.", {
        variant: "warning",
      });
    } else if (price > currBalance && editId === 0) {
      enqueueSnackbar("Can't spend more than wallet balance.", {
        variant: "warning",
      });
    } else if (editId !== 0 && diffPrice > currBalance) {
      enqueueSnackbar("Can't spend more than available wallet balance", {
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
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        title: title,
        price: price,
        category: category,
        date: date,
      };
      const existingExpenses =
        JSON.parse(localStorage.getItem("expenses")) || [];
      let totExpenses;
      let remainingBalance;
      if (editId === 0) {
        existingExpenses.push(data);
        totExpenses = parseFloat(expenses) + parseFloat(price);
        remainingBalance = parseInt(currBalance) - parseInt(price);
        setTitle("");
        setPrice(0);
        setCategory("");
        setDate("");
      } else {
        existingExpenses.forEach((expense) => {
          if (expense.id === editId) {
            expense.id = editId;
            expense.title = title;
            expense.price = price;
            expense.category = category;
            expense.date = date;
          }
        });
        totExpenses = parseFloat(expenses) + parseFloat(diffPrice);
        remainingBalance = parseInt(currBalance) - parseInt(diffPrice);
      }
      localStorage.setItem("expenses", JSON.stringify(existingExpenses));
      setExpensesArr(existingExpenses);
      setExpenses(totExpenses);
      localStorage.setItem("balance", `${remainingBalance}`);
      setWalletBalance(remainingBalance);
      closeModal();
    }
  };

  return (
    <div>
      {type === "add" && (
        <button className={styles.addButton} onClick={openModal}>
          + Add Expense
        </button>
      )}
      {type === "edit" && (
        <button className={styles.editButton} onClick={openModal}>
          <img src={EditPic} alt="Edit" />
        </button>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1 style={{ color: "#000000", marginBottom: "1rem" }}>
          {type === "add" ? "Add" : "Edit"} Expense
        </h1>
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
              value={`${type === "add" ? "Add" : "Edit"} Expense`}
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

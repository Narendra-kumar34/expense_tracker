import React, { useState } from "react";
import styles from "./RecentTransactions.module.css";
import {
  PiPizzaLight,
  PiGiftLight,
  PiSuitcaseRollingLight,
} from "react-icons/pi";
import DeletePic from "../assets/DeleteImg.png";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import AddEditExpensesModal from "./AddEditExpensesModal";

export default function RecentTransactions({
  expensesArr,
  setExpensesArr,
  setWalletBalance,
  expenses,
  setExpenses
}) {
  const [pageno, setPageno] = useState(1);
  const sortedArr = expensesArr.sort((expense1, expense2) => {
    const date1 = new Date(expense1.date).getTime();
    const date2 = new Date(expense2.date).getTime();
    return date2 - date1;
  });
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-IN", options);
    return formattedDate;
  };

  const totPages = Math.ceil(sortedArr.length / 3);
  const firstItemIndex = (pageno - 1) * 3;
  const lastItemIndex = Math.min(pageno * 3 - 1, sortedArr.length - 1);
  const currItems = sortedArr.slice(firstItemIndex, lastItemIndex + 1);

  const handleNext = () => {
    if (pageno < totPages) {
      setPageno((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (pageno > 1) {
      setPageno((prevPage) => prevPage - 1);
    }
  };

  const handleDelete = (id) => {
    const delObj = JSON.parse(localStorage.getItem("expenses")).find((expense) => expense.id === id);
    const arr = JSON.parse(localStorage.getItem("expenses")).filter((expense) => expense.id !== id);
    setExpensesArr(arr);
    localStorage.setItem("expenses", JSON.stringify(arr));
    setExpenses(parseInt(expenses) - parseInt(delObj.price));
    const currBalance = localStorage.getItem("balance");
    const remainingBalance = parseInt(currBalance) + parseInt(delObj.price);
    localStorage.setItem("balance", `${remainingBalance}`);
    setWalletBalance(remainingBalance);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.tableWrapper}>
        <table>
          <tbody>
            {currItems.map((expense) => {
              return (
                <tr className={styles.rowWrapper} key={expense.id}>
                  <td className={styles.detailsWrapper}>
                    <div className={styles.iconBox}>
                      {expense.category === "entertainment" ? (
                        <PiGiftLight />
                      ) : expense.category === "food" ? (
                        <PiPizzaLight />
                      ) : (
                        <PiSuitcaseRollingLight />
                      )}
                    </div>
                    <div className={styles.titleBox}>
                      <div className={styles.title}>{expense.title}</div>
                      <div className={styles.date}>
                        {formatDate(expense.date)}
                      </div>
                    </div>
                  </td>
                  <td className={styles.manipulateWrapper}>
                    <div className={styles.price}>₹{expense.price}</div>
                    <button className={styles.deleteBox} onClick={() => handleDelete(expense.id)}>
                      <img src={DeletePic} alt="Delete" />
                    </button>
                    <AddEditExpensesModal
                      type="edit"
                      editId={expense.id}
                      setExpensesArr={setExpensesArr}
                      setExpenses={setExpenses}
                      setWalletBalance={setWalletBalance}
                      expenses={expenses}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.tableNavWrapper}>
        <button className={styles.arrowBox} onClick={() => handlePrev()}>
          <FaArrowLeftLong />
        </button>
        <div className={styles.pagenoBox}>{pageno}</div>
        <button className={styles.arrowBox} onClick={() => handleNext()}>
          <FaArrowRightLong />
        </button>
      </div>
    </div>
  );
}

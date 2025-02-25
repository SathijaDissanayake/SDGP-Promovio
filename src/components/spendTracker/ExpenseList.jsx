import './ExpenseList.css';
import React from 'react';

const ExpenseList = ({ items, deleteItem }) => {
  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.description}</td>
            <td>${item.amount}</td>
            <td>{item.category}</td>
            <td>
              <button className="btn btn-outline-danger" onClick={() => deleteItem(item.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}

        <tr className="total-row">
          <td>Total</td>
          <td>${items.reduce((total, item) => total + parseFloat(item.amount), 0).toFixed(2)}</td>
          <td colSpan="2"></td>
        </tr>
      </tbody>
    </table>
  );
};

export default ExpenseList;

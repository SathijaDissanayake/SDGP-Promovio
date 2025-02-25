import React from 'react';
import './ExpenseFilter.css';

const ExpenseFilter = ({ filterItem }) => {
  return (
    <div className="expense-filter">
      <select className="form-select" onChange={(event) => filterItem(event.target.value)}>
        <option value="">Select Category</option>
        <option value="utilities">Utilities</option>
        <option value="marketing">Marketing</option>
        <option value="salary">Salary</option>
      </select>
    </div>
  );
};

export default ExpenseFilter;
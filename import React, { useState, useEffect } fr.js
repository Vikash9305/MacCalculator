import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ amount: '', category: '', date: '', description: '' });

  useEffect(() => {
    axios.get('/expenses').then((response) => {
      setExpenses(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/expenses', form).then((response) => {
      setExpenses([...expenses, response.data]);
      setForm({ amount: '', category: '', date: '', description: '' });
    });
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        ></textarea>
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id}>
            {expense.amount} - {expense.category} - {expense.date} - {expense.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseTracker;

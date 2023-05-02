import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [form, setForm] = useState({
    reward_name: '',
    amount: '',
    note: '',
  });

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newReward = { ...form };

    await fetch('http://localhost:5000/reward/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReward),
    }).catch((error) => {
      window.alert(error);
      return;
    });
    setForm({ reward_name: '', amount: '', note: '' });
    navigate('/');
  }

  return (
    <div>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="reward_name">Name of the reward</label>
          <input
            type="text"
            className="form-control"
            id="reward_name"
            value={form.reward_name}
            onChange={(e) => updateForm({ reward_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={form.amount}
            onChange={(e) => updateForm({ amount: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">Notes</label>
          <input
            type="text"
            className="form-control"
            id="note"
            value={form.note}
            onChange={(e) => updateForm({ note: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Create reward" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

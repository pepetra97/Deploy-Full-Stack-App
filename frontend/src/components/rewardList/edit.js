import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function Edit() {
  const [form, setForm] = useState({
    reward_name: '',
    amount: '',
    note: '',
  });

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/reward/${params.id.toString()}`
      );

      if (!response.ok) {
        window.alert(`An error has occurred: ${response.statusText}`);
        return;
      }

      const reward = await response.json();
      if (!reward) {
        window.alert(`Equipment with id ${id} not found`);
        navigate('/');
        return;
      }

      setForm(reward);
    }

    fetchData();
    return;
  }, [params.id, navigate]);

  async function onSubmit(e) {
    e.preventDefault();

    const editReward = {
      reward_name: form.reward_name,
      amount: form.amount,
      note: form.note,
    };

    await fetch(`http://localhost:5000/reward/update/${params.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(editReward),
    });

    navigate('/');
  }

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  return (
    <div>
      <h3>Update Reward</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="reward_name">Name of Reward: </label>
          <input
            type="text"
            className="form-control"
            id="reward_name"
            value={form.reward_name}
            onChange={(e) => updateForm({ reward_name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">amount: </label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={form.amount}
            onChange={(e) => updateForm({ amount: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="note">note: </label>
          <input
            type="text"
            className="form-control"
            id="note"
            value={form.note}
            onChange={(e) => updateForm({ note: e.target.value })}
          />
        </div>
        <br />

        <div className="form-group">
          <input type="submit" value="Update Equipment" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Rewards = (props) => (
  <tr>
    <td>{props.reward.reward_name}</td>
    <td>{props.reward.amount}</td>
    <td>{props.reward.note}</td>
    <td>
      <Link className="btn btn-link" to={`/reward-edit/${props.reward._id}`}>
        Edit
      </Link>{' '}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deletereward(props.reward._id);
        }}>
        Delete
      </button>
    </td>
  </tr>
);

function RewardList() {
  const [rewards, setRewards] = useState([]);
  useEffect(() => {
    async function getRewards() {
      const response = await fetch('http://localhost:5000/reward');

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const reward = await response.json();
      setRewards(reward);
    }

    getRewards();
    return;
  }, []);

  //Delete data function
  async function deletereward(id) {
    await fetch(`http://localhost:5000/reward/delete/${id}`, {
      method: 'DELETE',
    });

    const newReward = rewards.filter((reward) => reward._id !== id);
    setRewards(newReward);
  }

  //map reward lis
  function rewardList() {
    return rewards.map((reward) => {
      return (
        <Rewards
          reward={reward}
          deletereward={() => deletereward(reward._id)}
          key={reward._id}
        />
      );
    });
  }

  return (
    <div>
      <h3>Reward List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name Of Reward</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>{rewardList()}</tbody>
      </table>
    </div>
  );
}

export default RewardList;

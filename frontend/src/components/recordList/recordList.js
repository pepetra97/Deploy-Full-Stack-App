import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Record = (props) => (
  <tr>
    <td>{props.record.first_name}</td>
    <td>{props.record.last_name}</td>
    <td>{props.record.middle_name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>{props.record.location}</td>
    <td>
      <Link className="btn btn-link" to={`/record-edit/${props.record._id}`}>
        Edit
      </Link>{' '}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}>
        Delete
      </button>
      <button
        onClick={() => props.checkSimilar(props.record.position, props.record.level)}>
        Similar
      </button>
      |
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
      console.log(records);
    }

    getRecords();

    return;
  }, []);

  const checkSimilar = async (position, level) => {
    const response = await fetch(
      `http://localhost:5000/record/filtered/${position}/${level}`
    );

    const similarEmployees = await response.json();

    setRecords(similarEmployees);
  };

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`/record/delete/${id}`, {
      method: 'DELETE',
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  const [filterInput, setFilterInput] = useState({
    position: '',
    level: '',
  });

  const filterByPosition = () => {
    const filteredRecord = records.filter((record) => {
      if (filterInput.position && filterInput.level) {
        return (
          record.position.toLowerCase().includes(filterInput.position.toLowerCase()) &&
          record.level.toLowerCase().includes(filterInput.level.toLowerCase())
        );
      }
      if (filterInput.position) {
        return record.position.toLowerCase().includes(filterInput.position.toLowerCase());
      } else if (filterInput.level) {
        return record.level.toLowerCase().includes(filterInput.level.toLowerCase());
      } else {
        return records;
      }
    });

    return filteredRecord;
  };

  // This method will map out the records on the table
  const recordList = () => {
    return filterByPosition().map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
          checkSimilar={checkSimilar}
        />
      );
    });
  };

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Middle Name</th>
            <th>
              Position
              <input
                onChange={(e) =>
                  setFilterInput({ ...filterInput, position: e.target.value })
                }
                placeholder="filter by position"></input>
            </th>
            <th>
              Level
              <input
                onChange={(e) =>
                  setFilterInput({ ...filterInput, level: e.target.value })
                }
                placeholder="filter by level"></input>
            </th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}

import React, { useState } from 'react';
import axios from 'axios';

const AddPerson = ({ addNewPerson }) => {
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: number
    };
      addNewPerson(newPerson);
      setNewName('');
      setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={(event) => setNewName(event.target.value)} /> <br />
        number: <input value={number} onChange={(event) => setNumber(event.target.value)}  />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPerson;

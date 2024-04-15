import React, { useState } from 'react';

const AddPerson = ({ addNewName }) => {
  const [newName, setNewName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addNewName(newName, number);
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

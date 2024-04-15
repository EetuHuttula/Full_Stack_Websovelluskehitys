import React, { useState } from 'react';
import AddNewName from './components/AddPerson.jsx';
import Filter from './components/FilterSearch.jsx';
import PersonsList from './components/PersonsList.jsx';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [filterWords, setFilterWords] = useState("");
  
  const addNewName = (newName, number) => {
    const newPerson ={
      name: newName,
      number: number,
    }
    setPersons([...persons, newPerson])
  }

  const handleFilterChange = (event) => {
    setFilterWords(event.target.value);
  };

  const showFilteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterWords.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterWords={filterWords} handleFilterChange={handleFilterChange} />
      
      <h2>Add a new</h2>
      <AddNewName addNewName={addNewName} />

      <h2>Numbers</h2>
      <PersonsList persons={showFilteredPersons} />
    </div>
  );
};

export default App;

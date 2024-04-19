import React, { useState, useEffect } from 'react';
import AddPerson from './components/AddPerson.jsx';
import Filter from './components/FilterSearch.jsx';
import PersonsList from './components/PersonsList.jsx';
import personServerHelpers from './components/personServerHelpers';
import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterWords, setFilterWords] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personServerHelpers.getAllPersons()
      .then(initialPersons => {
        setPersons(initialPersons);
      });
  }, []);

  const addNewPerson = (newPerson) => {
    const existingPerson = persons.find(person => person.name === newPerson.name);
    if (existingPerson) {
      const confirmUpdate = window.confirm(`${newPerson.name} is already added to the phonebook, replace the old number with a new one?`);
      if (confirmUpdate) {
        personServerHelpers.updatePerson(existingPerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => 
              person.id !== existingPerson.id ? person : updatedPerson
            ));
            setMessage({ text: `Phone number updated for ${updatedPerson.name}`, type: 'success' });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch(error => {
            setMessage({ text: 'Error updating phone number', type: 'error' });
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      personServerHelpers.createPerson(newPerson)
        .then(returnedPerson => {
          setPersons([...persons, returnedPerson]);
          setMessage({ text: `Added ${returnedPerson.name}`, type: 'success' });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(error => {
          setMessage({ text: 'Error adding new person', type: 'error' });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this person?');
    if (confirmDelete) {
      personServerHelpers.deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage({ text: 'Person deleted', type: 'success' });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(error => {
          setMessage({ text: 'Error deleting person', type: 'error' });
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };

  const handleFilterChange = (event) => {
    setFilterWords(event.target.value);
  };

  const showFilteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterWords.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <div className={`message ${message.type}`}>{message.text}</div>}
      <Filter filterWords={filterWords} handleFilterChange={handleFilterChange} />
      
      <h2>Add a new</h2>
      <AddPerson addNewPerson={addNewPerson} />

      <h2>Numbers</h2>
      <PersonsList persons={showFilteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;

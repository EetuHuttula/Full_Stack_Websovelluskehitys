import { useState, useEffect } from 'react'
import country from './components/Countries'

const CountryList = ({ countries }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name}>
          {country.name}
        </div>
      ))}
    </div>
  )
}
const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={`${country.name} flag`} style={{ width: '150px' }} />
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([])
  const [inputString, setInputString] = useState('')

  useEffect(() => {
    country.getAll().then((initialCountries) => {
      setCountries(initialCountries)
    })
  }, [])

  const handleSearch = (event) => {
    setInputString(event.target.value)
  }
  const countriesToShow = countries.filter((country) =>
    country.name.toLowerCase().includes(inputString.toLowerCase())
  )

  if (countriesToShow.length === 1) {
    return (
      <div>
        find countries
        <input value={inputString} onChange={handleSearch} />
        <p />
        <Country country={countriesToShow[0]} />
      </div>
    )
  }

  if (countriesToShow.length >= 10) {
    return (
      <div>
        find countries
        <input value={inputString} onChange={handleSearch} />
        <p />
        Too many matches, specify filter
      </div>
    )
  }
  return (
    <div>
      find countries
      <input value={inputString} onChange={handleSearch} />
      <p />
      <CountryList countries={countriesToShow} />
    </div>
  )
}
export default App
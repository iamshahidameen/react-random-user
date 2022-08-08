import React, { useState, useEffect, useCallback } from 'react';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';
const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';
function App() {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState({});
  const [title, setTitle] = useState('name');
  const [value, setValue] = useState('Random User');

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      console.log(e.target.getAttribute('data-label'));
      setTitle(e.target.getAttribute('data-label'));
      const getValue = e.target.getAttribute('data-label');
      setValue(getValue);
      console.log(person.value);
    }
  };

  const getUser = async () => {
    setLoading(true);
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      const person = data.results[0];
      console.log(person);
      const { phone, email } = person;
      const { large: image } = person.picture;
      const {
        login: { password },
      } = person;
      const { first, last } = person.name;
      const {
        dob: { age },
      } = person;
      const {
        street: { number, name },
      } = person.location;

      const newPerson = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      };
      console.log(newPerson, 'newObje');
      setPerson(newPerson);
      setLoading(false);
      setTitle('name');
      setValue(newPerson.name);
    } catch (Error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  if (loading) {
    return <h2>Page is Loading</h2>;
  }
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getUser}>
            {loading ? 'Loading...' : 'Random User'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;

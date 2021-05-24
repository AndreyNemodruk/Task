/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import '../../../App.scss';
import Card from '../Card/Card';
import FormContact from '../Form/Form';
import api from '../../../api';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [contactsForRender, setContactsForRender] = useState([]);
  const [searchString, setSearchString] = useState('');
  const handleChange = (e) => {
    setSearchString(e.target.value);
  };

  useEffect(() => {
    const filteredContacts = contacts.filter((i) =>
      i.name.toLowerCase().includes(searchString.toLowerCase())
    );
    setContactsForRender(filteredContacts);
  }, [contacts, searchString]);
  useEffect(() => {
    api
      .get()
      .then((res) => res.json())
      .then((data) => {
        setContacts(data.contacts);
      });
  }, []);
  return (
    <div className="wrapper">
      <header className="header">
        <h1 className="heading">Phone Book</h1>
      </header>
      <aside className="aside">
        <FormContact setContacts={setContacts} />
        <div className="search">
          <input
            className="search_input"
            placeholder="Search by name"
            onChange={(e) => handleChange(e)}
          />
        </div>
      </aside>
      <main className="main">
        <div className="main_content">
          <ul className="main_content_wrap">
            {contactsForRender?.map((i) => (
              // eslint-disable-next-line no-underscore-dangle
              <li className="card_item" key={i._id}>
                <Card item={i} cards={contacts} setContacts={setContacts} />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default App;

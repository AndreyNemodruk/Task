import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import ErrorMessage from '../Error/Error';

const FormContact = ({ setContacts }) => {
  const initForm = {
    name: '',
    phone: '',
  };
  const [errorData, setErrorData] = useState(null);
  const [form, setForm] = useState(initForm);
  const clearError = () => {
    setTimeout(() => setErrorData(null), 2500);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .create(form)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((er) => {
            const error = new Error('ошибка');
            error.data = er;
            throw error;
          });
        }
        return res.json();
      })
      .then((data) => {
        setContacts(data.contacts);
        setForm(initForm);
      })
      .catch((er) => {
        setErrorData(er.data.message);
        clearError();
      });
  };
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form_wrap">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h2 className="form_head">Create contact</h2>
        <ErrorMessage error={errorData} />
        <label className="label_form" htmlFor="name">
          <span className="label_name">Name:</span>
          <input
            required
            onChange={(e) => handleChangeForm(e)}
            type="text"
            name="name"
            id="name"
            value={form.name}
            placeholder="Enter name"
            className="search_input"
          />
        </label>

        <label className="label_form" htmlFor="phone">
          <span className="label_phone">Phone:</span>
          <input
            required
            onChange={(e) => handleChangeForm(e)}
            type="text"
            name="phone"
            id="phone"
            value={form.phone}
            placeholder="Enter phone +380..."
            className="search_input"
          />
        </label>
        <button className="button_submit" type="submit">
          Create Contact
        </button>
      </form>
    </div>
  );
};

FormContact.propTypes = {
  setContacts: PropTypes.func,
};
FormContact.defaultProps = {
  setContacts: () => {},
};

export default FormContact;

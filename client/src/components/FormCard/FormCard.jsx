/* eslint-disable jsx-a11y/no-autofocus */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';

const FormCard = ({ toggle, item, setContacts }) => {
  const [form, setForm] = useState(item);
  const [errorData, setErrorData] = useState(null);
  const clearError = () => {
    setTimeout(() => setErrorData(null), 2500);
  };
  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .edit(item._id, form)
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
        setContacts(data);
        toggle((prev) => !prev);
      })
      .catch((er) => {
        setErrorData(er.data.message);
        clearError();
      });
  };
  return (
    <form className="form_card" onSubmit={(e) => handleSubmit(e)}>
      <h2 className={`form_card_head ${errorData && 'error'}`}>
        {errorData || 'Edit contact'}
      </h2>
      <label htmlFor="name" className="label_name_card">
        <input
          autoFocus
          autoComplete="off"
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

      <label className="label_phone_card" htmlFor="phone">
        <input
          required
          autoComplete="off"
          onChange={(e) => handleChangeForm(e)}
          type="text"
          name="phone"
          id="phone"
          value={form.phone}
          placeholder="Enter phone +380..."
          className="search_input"
        />
      </label>
      <div className="card_button_wrap">
        <button type="submit">Change</button>
        <button type="button" onClick={() => toggle((prev) => !prev)}>
          Cancel
        </button>
      </div>
    </form>
  );
};

FormCard.propTypes = {
  setContacts: PropTypes.func,
  toggle: PropTypes.func,
  item: {
    name: PropTypes.string,
    phone: PropTypes.string,
    _id: PropTypes.string,
  },
};
FormCard.defaultProps = {
  setContacts: () => {},
  toggle: () => {},
  item: {},
};

export default FormCard;

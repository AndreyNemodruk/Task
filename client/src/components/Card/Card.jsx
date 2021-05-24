/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Icons from '../../icons/icons';
import FormCard from '../FormCard/FormCard';
import api from '../../../api';

const Card = ({ item, cards, setContacts }) => {
  const [toggle, setToggle] = useState(true);
  const handleDelete = () => {
    api.delete(item._id).then((res) => {
      if (res.ok) {
        const updateContacts = cards.filter((i) => i._id !== item._id);
        setContacts(updateContacts);
      }
    });
  };
  return (
    <div className="card">
      {toggle ? (
        <>
          <div className="content_card">
            <Icons name="user" />
            <p className="card_name">{item.name}</p>
          </div>
          <p className="card_phone">{item.phone}</p>
          <div className="button_wrap">
            <button
              type="button"
              className="button_card"
              onClick={() => setToggle((prev) => !prev)}
            >
              Change
            </button>
            <button
              type="button"
              className="button_card"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <FormCard setContacts={setContacts} toggle={setToggle} item={item} />
      )}
    </div>
  );
};

Card.propTypes = {
  item: {
    name: PropTypes.string,
    phone: PropTypes.string,
    _id: PropTypes.string,
  },
  cards: [PropTypes.object],
  setContacts: PropTypes.func,
};

Card.defaultProps = {
  item: {},
  cards: [],
  setContacts: () => {},
};

export default Card;

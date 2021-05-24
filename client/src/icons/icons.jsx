import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as User } from './user.svg';
import { ReactComponent as User2 } from './user2.svg';

const Icons = ({ name }) => {
  switch (name) {
    case 'user':
      return <User />;
    case 'user2':
      return <User2 />;
    default:
      return null;
  }
};

Icons.propTypes = {
  name: PropTypes.string,
};
Icons.defaultProps = {
  name: '',
};

export default Icons;

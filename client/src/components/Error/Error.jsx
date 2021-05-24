import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ error }) => (
  <>
    <p className="error">{error || ''}</p>
  </>
);

ErrorMessage.propTypes = {
  error: PropTypes.string,
};

ErrorMessage.defaultProps = {
  error: '',
};

export default ErrorMessage;

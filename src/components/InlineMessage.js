import React from 'react';
import PropTypes from 'prop-types';

const InlineMessage = ({ message, type }) => (
  <p className={type}>{message}</p>
);

InlineMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'info']),
};

InlineMessage.defaultProps = {
  type: 'info',
};

export default InlineMessage;

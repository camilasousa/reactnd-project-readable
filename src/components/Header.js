import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ categories }) => (
  <div>
    <h1>Readable</h1>
    <ul>
      {
        categories && categories.map(
          cat => <li key={cat.name}>{cat.name}</li>,
        )
      }
    </ul>
  </div>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
};

export default Header;

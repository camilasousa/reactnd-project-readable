import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = ({ categories }) => (
  <div>
    <Link to="/"><h1>Readable</h1></Link>
    <ul>
      {
        categories && categories.map(cat => (
          <li key={cat.name}>
            <Link to={`/categories/${cat.path}`}>
              {cat.name}
            </Link>
          </li>
        ))
      }
    </ul>
    <Link to="/posts">New Post</Link>
  </div>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string.isRequired,
  })).isRequired,
};

export default Header;

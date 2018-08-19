import React from 'react';
import PropTypes from 'prop-types';

import CommentDetail from './CommentDetail';

const CommentList = ({ comments }) => (
  <div>
    <h2>Comments</h2>
    <ul>
      {
        comments && comments.map(comment => (
          <li key={comment.id}>
            <CommentDetail comment={comment} />
          </li>
        ))
      }
    </ul>
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })),
};

CommentList.defaultProps = {
  comments: null,
};

export default CommentList;

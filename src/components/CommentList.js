import React from 'react';
import PropTypes from 'prop-types';

import { formatTimestamp } from '../utils/date-utils';

const CommentList = ({ comments }) => (
  <div>
    <h2>Comments</h2>
    <ul>
      {
        comments && comments.map(comment => (
          <div key={comment.id}>
            <p>{comment.body}</p>
            <p>{formatTimestamp(comment.timestamp)}</p>
            <p>{comment.voteScore}</p>
            <p>{comment.author}</p>
          </div>
        ))
      }
    </ul>
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  })),
};

CommentList.defaultProps = {
  comments: null,
};

export default CommentList;

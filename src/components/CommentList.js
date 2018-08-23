import React from 'react';
import PropTypes from 'prop-types';

import CommentDetail from './CommentDetail';

const title = (comments) => {
  if (!comments) return '0 comments';
  return `${comments.length} comment${comments.length === 1 ? '' : 's'}`;
};

const CommentList = ({ comments }) => (
  <div>
    <h2>{title(comments)}</h2>
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

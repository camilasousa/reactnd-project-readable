import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatTimestamp } from '../utils/date-utils';

import CommentVoteScore from './CommentVoteScore';

const CommentList = ({ comments }) => (
  <div>
    <h2>Comments</h2>
    <ul>
      {
        comments && comments.map(comment => (
          <div key={comment.id}>
            <Link to={`/comments/${comment.id}/edit`}><p>{comment.body}</p></Link>
            <p>{formatTimestamp(comment.timestamp)}</p>
            <CommentVoteScore voteScore={comment.voteScore} id={comment.id} />
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

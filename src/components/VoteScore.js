import React from 'react';
import PropTypes from 'prop-types';

const VoteScore = ({ id, voteScore, upVote, downVote }) => (
  <div>
    <button onClick={() => upVote(id)}>+</button>
    <span>{voteScore}</span>
    <button onClick={() => downVote(id)}>-</button>
  </div>
);

VoteScore.propTypes = {
  id: PropTypes.string.isRequired,
  voteScore: PropTypes.number.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default VoteScore;

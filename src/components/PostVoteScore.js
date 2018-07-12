import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { downVotePost, upVotePost } from '../actions/posts';

const PostVoteScore = ({ post, upVote, downVote }) => (
  <div>
    <button onClick={upVote}>+</button>
    <span>{post.voteScore}</span>
    <button onClick={downVote}>-</button>
  </div>
);

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
  downVote: () => dispatch(downVotePost(ownProps.post.id)),
  upVote: () => dispatch(upVotePost(ownProps.post.id)),
});

PostVoteScore.propTypes = {
  post: PropTypes.shape({
    voteScore: PropTypes.number.isRequired,
  }).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostVoteScore);

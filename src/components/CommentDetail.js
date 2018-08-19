import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { formatTimestamp } from '../utils/date-utils';
import { removeComment } from '../actions/comments';

import CommentVoteScore from './CommentVoteScore';

class CommentDetail extends React.Component {
  handleOnDelete = () => {
    const { comment } = this.props;
    this.props.deleteComment(comment.id);
  }

  render() {
    const { comment } = this.props;
    return (
      <div>
        <Link to={`/comments/${comment.id}/edit`}><p>{comment.body}</p></Link>
        <p>{formatTimestamp(comment.timestamp)}</p>
        <CommentVoteScore voteScore={comment.voteScore} id={comment.id} />
        <p>{comment.author}</p>
        <button onClick={this.handleOnDelete}>Delete</button>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  deleteComment: id => dispatch(removeComment(id)),
});

CommentDetail.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentDetail);

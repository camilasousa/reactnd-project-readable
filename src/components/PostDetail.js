import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPost } from '../actions/posts';
import { loadComments } from '../actions/comments';

import { formatTimestamp } from '../utils/date-utils';

import CommentList from './CommentList';
import PostVoteScore from './PostVoteScore';

class PostDetail extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postId !== this.props.postId) {
      this.fetchData();
    }
  }

  fetchData() {
    const id = this.props.postId;
    this.props.getPost(id);
    this.props.listComments(id);
  }

  render() {
    const { post, comments } = this.props;
    if (!post) return null;
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{formatTimestamp(post.timestamp)}</p>
        <PostVoteScore voteScore={post.voteScore} id={post.id} />
        <p>{post.author}</p>
        <p>{post.body}</p>
        <CommentList comments={comments} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.match.params.id;
  return {
    postId,
    post: state.postsById && state.postsById[postId],
    comments: state.commentsByPostId && state.commentsByPostId[postId],
  };
};

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(loadPost(id)),
  listComments: id => dispatch(loadComments(id)),
});

PostDetail.propTypes = {
  ...CommentList.propTypes,
  postId: PropTypes.string.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }),
  getPost: PropTypes.func.isRequired,
  listComments: PropTypes.func.isRequired,
};

PostDetail.defaultProps = {
  post: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);

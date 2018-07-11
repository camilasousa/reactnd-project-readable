import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadPost } from '../actions/posts';
import { formatTimestamp } from '../utils/date-utils';

class PostDetail extends React.Component {
  componentDidMount() {
    this.props.getPost(this.props.postId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postId !== this.props.postId) {
      this.props.getPost(this.props.postId);
    }
  }

  render() {
    const { post } = this.props;
    if (!post) return null;
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{formatTimestamp(post.timestamp)}</p>
        <p>{post.voteScore}</p>
        <p>{post.author}</p>
        <p>{post.body}</p>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.match.params.id;
  return {
    postId,
    post: state.postsById && state.postsById[postId],
  };
};

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(loadPost(id)),
});

PostDetail.propTypes = {
  postId: PropTypes.string.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
  }),
  getPost: PropTypes.func.isRequired,
};

PostDetail.defaultProps = {
  post: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);

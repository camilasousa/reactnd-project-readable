import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InlineMessage from './InlineMessage';

import { newComment, changeComment, loadComment } from '../actions/comments';

class CommentForm extends React.Component {
  state = {
    loading: false,
    hasError: false,
    author: '',
    body: '',
  };

  componentDidMount() {
    this.fetchComment();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.commentId !== this.props.commentId) {
      this.fetchComment();
    }
  }

  fetchComment() {
    const id = this.props.commentId;
    if (id) {
      this.props.getComment(id)
        .then(comment => this.setState({ body: comment.body, author: comment.author }));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
      hasError: false,
    });

    const data = {
      body: this.state.body,
      author: this.state.author,
    };

    const action = (
      this.props.comment ?
        this.props.updateComment(this.props.comment.id, data) :
        this.props.createComment(this.props.postId, data)
    );
    action
      .then((comment) => {
        this.setState({ body: '', author: '', loading: false });
        if (this.props.onSuccess) {
          this.props.onSuccess();
        } else {
          this.props.history.push(`/posts/${comment.parentId}`);
        }
      })
      .catch(() => this.setState({ hasError: true, loading: false }));
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  renderForm() {
    if (this.state.loading) {
      return <InlineMessage message="Wait, creating comment..." type="info" />;
    }
    if (this.props.commentId && !this.props.comment) {
      return <InlineMessage message="Wait, loading comment..." type="info" />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="body">
          Body:
        </label>
        <input
          id="body"
          type="text"
          value={this.state.body}
          onChange={this.handleChange}
        />
        <label htmlFor="author">
          Author:
        </label>
        <input
          id="author"
          type="text"
          value={this.state.author}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }

  render() {
    return (
      <div>
        <h1>New comment</h1>
        {
          this.state.hasError &&
            <InlineMessage message="An error ocurred, please try again." type="error" />
        }
        { this.renderForm() }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const commentId = ownProps.match && ownProps.match.params.id;
  return ({
    commentId,
    comment: state.commentsById && state.commentsById[commentId],
  });
};

const mapDispatchToProps = dispatch => ({
  createComment: (postId, data) => dispatch(newComment(postId, data)),
  updateComment: (commentId, data) => dispatch(changeComment(commentId, data)),
  getComment: commentId => dispatch(loadComment(commentId)),
});

CommentForm.propTypes = {
  commentId: PropTypes.string,
  createComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  getComment: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }),
  postId: PropTypes.string,
  onSuccess: PropTypes.func,
};

CommentForm.defaultProps = {
  commentId: null,
  comment: null,
  postId: null,
  onSuccess: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CommentForm));

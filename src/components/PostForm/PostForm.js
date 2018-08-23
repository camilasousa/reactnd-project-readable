import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import Form from './Form';
import InlineMessage from '../InlineMessage';

import { loadCategories } from '../../actions/categories';
import { newPost, loadPost, changePost } from '../../actions/posts';


class PostForm extends React.Component {
  state = { loading: false, hasError: false }

  componentDidMount() {
    this.props.listCategories();
    this.fetchPost();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postId !== this.props.postId) {
      this.fetchPost();
    }
  }

  fetchPost() {
    const id = this.props.postId;
    if (id) {
      this.props.getPost(id);
    }
  }

  handleSubmit = (data) => {
    this.setState({
      loading: true,
      hasError: false,
    });

    const action = (
      this.props.postId ?
        this.props.updatePost(this.props.postId, data) :
        this.props.createPost(data)
    );
    action
      .then(post => this.props.history.push(`/${post.category}/${post.id}`))
      .catch(() => this.setState({ hasError: true, loading: false }));
  }

  render() {
    const { categories, postId, post } = this.props;
    return (
      <div>
        <Link to="/"><h1>Readable</h1></Link>
        <h1>New post</h1>
        {
          this.state.hasError &&
            <InlineMessage message="An error ocurred, please try again." type="error" />
        }
        {
          this.state.loading &&
            <InlineMessage message="Wait, creating post..." type="info" />
        }
        {
          !postId || (post && post.id === postId) || !categories ?
            <Form
              post={post}
              categories={categories}
              onSubmit={this.handleSubmit}
              disabled={this.state.loading}
            /> :
            <InlineMessage message="Loading post..." type="info" />
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const postId = ownProps.match.params.id;
  return ({
    postId,
    post: state.postsById && state.postsById[postId],
    categories: state.categories,
  });
};

const mapDispatchToProps = dispatch => ({
  getPost: id => dispatch(loadPost(id)),
  listCategories: () => dispatch(loadCategories()),
  createPost: data => dispatch(newPost(data)),
  updatePost: (postId, data) => dispatch(changePost(postId, data)),
});

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  listCategories: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
  })).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
  postId: PropTypes.string,
};

PostForm.defaultProps = {
  postId: null,
  post: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PostForm));

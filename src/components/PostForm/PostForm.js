import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Form from './Form';

import { loadCategories } from '../../actions/categories';
import { newPost } from '../../actions/posts';

class PostForm extends React.Component {
  state = { title: '', body: '', author: '', categoryPath: '', loading: false, hasError: false }

  componentDidMount() {
    this.props.listCategories();
  }

  handleSubmit = (data) => {
    this.setState({
      loading: true,
      hasError: false,
    });
    this.props.createPost(data)
      .then(post => this.props.history.push(`/posts/${post.id}`))
      .catch(() => this.setState({ hasError: true, loading: false }));
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <h1>New post</h1>
        {
          this.state.hasError &&
            <p>An error ocurred, please try again.</p>
        }
        {
          this.state.loading &&
            <p>Wait, creating post...</p>
        }
        <Form
          categories={categories}
          onSubmit={this.handleSubmit}
          disabled={this.state.loading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  listCategories: () => dispatch(loadCategories()),
  createPost: data => dispatch(newPost(data)),
});

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  listCategories: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
  })).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PostForm));

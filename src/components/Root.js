import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCategories } from '../actions/categories';
import { loadPosts } from '../actions/posts';

import Header from './Header';
import PostList from './PostList';

class Root extends React.Component {
  componentDidMount() {
    this.props.listCategories();
    this.props.listPosts();
  }

  render() {
    return (
      <div>
        <Header categories={this.props.categories} />
        <PostList posts={this.props.posts} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  listCategories: () => dispatch(loadCategories()),
  listPosts: () => dispatch(loadPosts()),
});

Root.propTypes = {
  ...Header.propTypes,
  listCategories: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCategories } from '../actions/categories';
import { loadPostsByCategory } from '../actions/posts';

import Header from './Header';
import PostList from './PostList';

class Category extends React.Component {
  componentDidMount() {
    this.props.listCategories();
    this.props.loadPostsByCategory(this.props.categoryPath);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.categoryPath !== this.props.categoryPath) {
      this.props.loadPostsByCategory(this.props.categoryPath);
    }
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

const mapStateToProps = (state, ownProps) => {
  const categoryPath = ownProps.match.params.id;
  return {
    categories: state.categories,
    categoryPath,
    posts: state.postsByCategory[categoryPath] || [],
  };
};

const mapDispatchToProps = dispatch => ({
  listCategories: () => dispatch(loadCategories()),
  loadPostsByCategory: id => dispatch(loadPostsByCategory(id)),
});

Category.propTypes = {
  ...Header.propTypes,
  listCategories: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Category);

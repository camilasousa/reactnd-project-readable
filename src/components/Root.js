import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCategories } from '../actions/categories';

import Header from './Header';

class Root extends React.Component {
  componentDidMount() {
    this.props.listCategories();
  }

  render() {
    return (
      <div>
        <Header categories={this.props.categories} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  listCategories: () => dispatch(loadCategories()),
});

Root.propTypes = {
  ...Header.propTypes,
  listCategories: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);

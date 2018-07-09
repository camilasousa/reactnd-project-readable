import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loadCategories } from '../actions/categories';


class Root extends React.Component {
  componentDidMount() {
    this.props.listCategories();
  }

  render() {
    return (
      <div>
        {
          this.props.categories && this.props.categories.map(cat => <div>{cat.name}</div>)
        }
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
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  listCategories: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);

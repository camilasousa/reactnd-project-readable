import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { removePost } from '../actions/posts';


class DeletePostButton extends React.Component {
  handleOnDelete = () => {
    this.props.deletePost(this.props.postId)
      .then(() => {
        if (this.props.onSuccess) {
          this.props.onSuccess();
        } else {
          this.props.history.push('/');
        }
      });
  }

  render() {
    return (
      <button className="inline-button" onClick={this.handleOnDelete}>Delete</button>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(removePost(id)),
});


DeletePostButton.propTypes = {
  postId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
  deletePost: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

DeletePostButton.defaultProps = {
  onSuccess: null,
};


export default connect(
  null,
  mapDispatchToProps,
)(withRouter(DeletePostButton));

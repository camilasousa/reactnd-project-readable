import { connect } from 'react-redux';

import VoteScore from './VoteScore';
import { downVoteComment, upVoteComment } from '../actions/comments';


const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  downVote: id => dispatch(downVoteComment(id)),
  upVote: id => dispatch(upVoteComment(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VoteScore);

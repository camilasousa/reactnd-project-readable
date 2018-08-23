import { connect } from 'react-redux';

import VoteScore from './VoteScore';
import { downVotePost, upVotePost } from '../actions/posts';

const mapDispatchToProps = dispatch => ({
  downVote: id => dispatch(downVotePost(id)),
  upVote: id => dispatch(upVotePost(id)),
});

export default connect(
  null,
  mapDispatchToProps,
)(VoteScore);

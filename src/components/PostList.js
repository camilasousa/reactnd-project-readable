import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { formatTimestamp } from '../utils/date-utils';

import PostVoteScore from './PostVoteScore';

const OPTIONS = [
  { value: 'timestamp', label: 'Date' },
  { value: 'voteScore', label: 'Vote Score' },
];

const descSortPosts = (p1, p2, field) => {
  if (p1[field] < p2[field]) {
    return 1;
  }
  if (p1[field] > p2[field]) {
    return -1;
  }
  return 0;
};

const PostItem = ({ post }) => (
  <li>
    <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>
    <p>{formatTimestamp(post.timestamp)}</p>
    <p>Author: {post.author}</p>
    <p>{post.commentCount} comment{post.commentCount !== 1 ? 's' : ''}</p>
    <PostVoteScore voteScore={post.voteScore} id={post.id} />
  </li>
);

PostItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
  }).isRequired,
};

const Filter = ({ options, selectedOption, onChange }) => (
  <div>
    <p>Order by:</p>
    {
      options && options.map(option => (
        <label htmlFor={option.value} key={option.value}>
          <input
            id={option.value}
            type="radio"
            value={option.value}
            onChange={() => onChange(option.value)}
            checked={selectedOption === option.value}
          />
          {option.label}
        </label>
      ))
    }
  </div>
);

Filter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  selectedOption: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Filter.defaultProps = {
  selectedOption: null,
};

class PostList extends React.Component {
  state = {
    selectedOption: 'voteScore',
  }

  handleFilterChange = option => this.setState({ selectedOption: option });

  render() {
    const { posts } = this.props;
    return (
      <div>
        <h2>Posts</h2>
        <Filter
          options={OPTIONS}
          selectedOption={this.state.selectedOption}
          onChange={this.handleFilterChange}
        />
        <ul>
          {
            posts && posts.sort(
              (p1, p2) => descSortPosts(p1, p2, this.state.selectedOption),
            ).map(
              post => <PostItem key={post.id} post={post} />,
            )
          }
        </ul>
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })).isRequired,
};

export default PostList;

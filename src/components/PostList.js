import React from 'react';
import PropTypes from 'prop-types';


const PostItem = ({ post }) => (
  <li>
    <h3>{post.title}</h3>
    <p>{new Date(post.timestamp).toLocaleString()}</p>
    <p>{post.voteScore}</p>
  </li>
);

const PostList = ({ posts }) => (
  <div>
    <h2>Posts</h2>
    <ul>
      {
        posts && posts.map(
          post => <PostItem key={post.id} post={post} />,
        )
      }
    </ul>
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
};

export default PostList;

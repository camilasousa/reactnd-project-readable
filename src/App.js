import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import CommentForm from './components/CommentForm';


const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/categories/:id" component={Category} />
    <Route exact path="/posts/:id" component={PostDetail} />
    <Route path="/posts/:id/edit" component={PostForm} />
    <Route path="/comments/:id/edit" component={CommentForm} />
    <Route exact path="/posts" component={PostForm} />
  </div>
);

export default App;

import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Category from './components/Category';
import PostDetail from './components/PostDetail';

const App = () => (
  <div>
    <Route exact path="/" component={Home} />
    <Route path="/categories/:id" component={Category} />
    <Route path="/posts/:id" component={PostDetail} />
  </div>
);

export default App;

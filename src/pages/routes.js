import { Switch, Route } from 'react-router-dom';
import GlobalFeed from './globalFeed';
import TagFeed from './tagFeed';
import YourFeed from './yourFeed';
import Authentication from './authentication';
import Article from './article';
import React from 'react';

export default () => {
  return(
    <Switch>
      <Route path='/' component={GlobalFeed} exact/>
      <Route path='/feed' component={YourFeed}/>
      <Route path='/tags/:slug' component={TagFeed} exact/>
      <Route path='/articles/:slug' component={Article} exact/>
      <Route path='/login' component={Authentication} exact/>
      <Route path='/register' component={Authentication} exact/>
    </Switch>
  )
};

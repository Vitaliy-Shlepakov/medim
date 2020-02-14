import { Switch, Route } from 'react-router-dom';
import GlobalFeet from './globalFeet';
import Authentication from './authentication';
import Article from './article';
import React from 'react';

export default () => {
  return(
    <Switch>
      <Route path='/' component={GlobalFeet} exact/>
      <Route path='/articles/:slug' component={Article} exact/>
      <Route path='/articles/:slug' component={Article} exact/>
      <Route path='/login' component={Authentication} exact/>
      <Route path='/register' component={Authentication} exact/>
    </Switch>
  )
};

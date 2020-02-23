import {Switch, Route} from 'react-router-dom';
import GlobalFeed from './globalFeed';
import TagFeed from './tagFeed';
import YourFeed from './yourFeed';
import Authentication from './authentication';
import Article from './article';
import CreateArticle from './createArticle';
import EditArticle from './editArticle';
import React from 'react';

export default () => {
    return (
        <Switch>
            <Route path='/' component={GlobalFeed} exact/>
            <Route path='/feed' component={YourFeed}/>
            <Route path='/tags/:slug' component={TagFeed}/>
            <Route path='/articles/new' component={CreateArticle}/>
            <Route path='/articles/:slug/edit' component={EditArticle}/>
            <Route path='/articles/:slug' component={Article}/>
            <Route path='/login' component={Authentication}/>
            <Route path='/register' component={Authentication}/>
        </Switch>
    )
};

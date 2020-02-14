import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './pages/routes.js';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'

const App = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes/>
      </Router>

    </div>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));


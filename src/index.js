import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './pages/routes.js';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'
import { CurrentUserProvider } from "./contexts/currectUser";

const App = () => {
  return (
    <CurrentUserProvider>
      <Router>
        <Header/>
        <Routes/>
      </Router>
    </CurrentUserProvider>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));


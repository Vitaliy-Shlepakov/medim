import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './pages/routes.js';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'
import { CurrentUserProvider } from "./contexts/currectUser";
import CurrentUserChecker from "./components/CurrentUserChecked";

const App = () => {
  return (
    <CurrentUserProvider>
        <CurrentUserChecker>
            <Router>
                <Header/>
                <Routes/>
            </Router>
        </CurrentUserChecker>
    </CurrentUserProvider>
  )
};

ReactDOM.render(<App />, document.getElementById('root'));


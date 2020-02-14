import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className="Header">
      <nav className="navbar navbar-light">
        <div className="container">
          <NavLink to="/" className="navbar-brand" exact>
            Medium
          </NavLink>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" exact>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" exact>
                Sing In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link" exact>
                Sing up
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;

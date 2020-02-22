import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext} from "../../contexts/currectUser";

const Header = () => {
  const [currentUserState] = useContext(CurrentUserContext);

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
            {
              currentUserState.isLoggedIn === false
              &&
              <>
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
              </>
            }
            {
              currentUserState.isLoggedIn &&
                <>
                <li className="nav-item">
                  <NavLink to="/articles/new" className="nav-link" exact>
                    <i className="ion-compose"></i>
                    &nbsp; New post
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={`/profiles/${currentUserState.currentUser.username}`} className="nav-link" exact>
                    <img
                      src={currentUserState.currentUser.image}
                      className="user-pic"
                      alt=""
                    />
                    &nbsp;{currentUserState.currentUser.username}
                  </NavLink>
                </li>
              </>
            }
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;

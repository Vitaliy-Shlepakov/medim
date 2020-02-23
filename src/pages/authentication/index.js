import React, {useEffect, useState, useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { CurrentUserContext } from "../../contexts/currectUser";
import BackendErrorMessages from "../../components/BackendErrorMessages";

const Authentication = props => {

  const isLogin = props.match.path === '/login';
  const pageTitle = isLogin ? 'Sign In' : 'Sign Up';
  const descriptionLink = isLogin ? '/register' : './login';
  const descriptionText = isLogin ? 'Need an account?' : 'Have an account?';
  const apiURl = isLogin ?  '/users/login' :  '/users';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [isSuccessfullSubmit, setSuccessfullSubmit] = useState(false);
  const [, setCurrentUserState] = useContext(CurrentUserContext);


  //custome hooks
  const [{isLoading, response, error}, doFetch ] = useFetch(apiURl);
  const [, setToken] = useLocalStorage('token');

  const handleSubmit = event => {
    event.preventDefault();
    const user = isLogin ? {email, password} : {email, password, username};
    doFetch({
      method: 'POST',
      data: {
        user
      }
    })
  };

  useEffect(() =>{
    if(!response){
      return;
    };
    //установка в localStorage через hook useLocalStorage
    setToken(response.user.token);
    //устанавливаем новое значение в нашем контексте
    setCurrentUserState(state => {
      return{
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: response.user
      }
    });
    setSuccessfullSubmit(true);
  }, [response, setToken, setCurrentUserState]);

  //redirect to main page if register is success
  if(isSuccessfullSubmit){
    return <Redirect to='/' />
  };


  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-3 col-xs-12">
            <h2 className="text-xs-center">
              {pageTitle}
            </h2>
            <p className="text-xs-center">
              <Link to={descriptionLink}>{descriptionText}</Link>
            </p>
            <form action="#" onSubmit={handleSubmit}>
              {
                error &&
                    <BackendErrorMessages backendErrors={error} />
              }
              <fieldset>
                {
                  !isLogin && (
                      <fieldset className="form-group">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="UserName"
                            value={username}
                            onChange={e => setUserName(e.target.value)}
                        />
                      </fieldset>
                  )
                }
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    autoComplete="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  {pageTitle}
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;

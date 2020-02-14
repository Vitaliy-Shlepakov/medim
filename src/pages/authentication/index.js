import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useFetch from '../../hooks/useFetch';

const Authentication = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmiting, setSubmiting] = useState(false);
  const [{isLoading, response, error}] = useFetch('/users/login');

  const handleSubmit = () => {
    setSubmiting(true)
  };

  // useEffect(() => {
  //   isSubmiting && axios('https://conduit.productionready.io/api/users/login', {
  //     method: 'POST',
  //     data: {
  //       user: {
  //         email: 'dsds@dds.fdf',
  //         password: 'dsdsd'
  //       }
  //     }
  //   })
  //     .then(resp => {
  //       setSubmiting(false);
  //       console.log(resp);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setSubmiting(false)
  //     })
  //
  // });

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-3 col-xs-12">
            <h2 className="text-xs-center">
              Login
            </h2>
            <p className="text-xs-center">
              <Link to="register">Need an account?</Link>
            </p>
            <form action="#" onSubmit={handleSubmit}>
              <fieldset>
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
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={isLoading}
                >
                  Sing in
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

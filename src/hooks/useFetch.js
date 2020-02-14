import React, {useEffect, useState} from 'react';
import axios from "axios";

export default url => {
  const baseUrl = `https://conduit.productionready.io/api`
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const doFetch = () => {

  };

  useEffect(() => {
    setIsLoading && axios(`${baseUrl}${url}`, {
      method: 'POST',
      data: {
        user: {
          email: 'dsds@dds.fdf',
          password: 'dsdsd'
        }
      }
    })
      .then(resp => {
        setIsLoading(false);
        setResponse(resp.data);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.response.data)
      })

  });

  return [{isLoading, response, error}, doFetch];

};


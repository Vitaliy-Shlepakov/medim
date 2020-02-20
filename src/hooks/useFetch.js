import React, {useEffect, useState} from 'react';
import axios from "axios";

export default url => {

  const baseUrl = `https://conduit.productionready.io/api`;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    isLoading && axios(`${baseUrl}${url}`, options)
      .then(resp => {
        setIsLoading(false);
        setResponse(resp.data);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err.response.data)
      })

  }, [isLoading, options, url]);

  return [{isLoading, response, error}, doFetch];

};


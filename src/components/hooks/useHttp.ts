import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../lib/urls';

interface RequestConfig {
  url: string;
  method: 'POST' | 'GET' | 'PATCH';
  withCredentials: boolean;
  token?: string;
}

function useHttp(requestConfig: RequestConfig) {
  const [loading, setLoading] = useState(false);
  const [showUserMessage, setShowUserMessage] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [message, setMessage] = useState('');

  // loading state for button
  //TODO convert all to state

  // function returned from this hook
  const sendRequest = async (body: any = null, callback: any = null) => {
    setLoading(true);
    await axios({
      method: requestConfig.method ? requestConfig.method : 'GET',
      url: `${baseURL}/${requestConfig.url}`,
      data: body,
      headers: {
        Authorization: `Bearer ${requestConfig.token || ''} `,
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      withCredentials: requestConfig.withCredentials,
    })
      .then((response) => {
        setIsErrorMessage(false);
        setShowUserMessage(true);
        setMessage(response.data.userMessage);
        setTimeout(() => {
          setLoading(false);
        }, 300);

        // callback from hook call
        if (callback) callback(response.data);
      })

      .catch((err) => {
        setIsErrorMessage(true);
        setShowUserMessage(true);
        setMessage(err.response.data.userMessage);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
  };
  return {
    loading,
    message,
    setMessage,
    setLoading,
    sendRequest,
    showUserMessage,
    setShowUserMessage,
    isErrorMessage,
    setIsErrorMessage,
  };
}

export default useHttp;

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../lib/urls';
//import { initialUserMessageState } from '../utils/initialStates';
import { UserMessageType } from '../../types';

interface RequestConfig {
  url: string;
  method: 'POST' | 'GET' | 'PATCH';
  withCredentials: boolean;
  token?: string;
}

const initialUserMessageState = {
  isErrorMessage: false,
  showUserMessage: false,
  userMessage: 'This is a test',
};
function useHttp(requestConfig: RequestConfig) {
  // loading state for button
  const [loading, setLoading] = useState(false);
  //  state for user message component
  const [message, setMessage] = useState<UserMessageType>(
    initialUserMessageState,
  );
  // function returned from this hook
  const sendRequest = async (body: any = null, callback: any = null) => {
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
        setMessage({
          isErrorMessage: false,
          showUserMessage: true,
          userMessage: response.data.userMessage,
        });
		console.log(message)
        setTimeout(() => {
          setLoading(false);
        }, 1500);

        // callback from hook call
        if (callback) callback(response.data);
      })

      .catch((err) => {
        setMessage({
          isErrorMessage: true,
          showUserMessage: true,
          userMessage: err.response.data.userMessage,
        });
        console.log(message);
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      });
  };
  return { loading, message, setMessage, setLoading, sendRequest };
}

export default useHttp;

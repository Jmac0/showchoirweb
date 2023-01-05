// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../lib/urls';
//import { initialUserMessageState } from '../utils/initialStates';
//import { UserMessageInterface } from '../utils/interfaces';

interface RequestConfig {
  url: string;
  method: 'POST' | 'GET' | 'PATCH';
  withCredentials: boolean;
  token?: string;
}

function useHttp(requestConfig: RequestConfig) {
  // loading state for button
  const [loading, setLoading] = useState(false);
  // state for user message component
  // const [message, setMessage] = useState<UserMessageInterface>(
  //   initialUserMessageState,
  // );
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
 console.log(response)
		  // set message info
        // setMessage({
        //   isErrorMessage: false,
        //   showUserMessage: true,
        //   message: response.data.message,
        // });
        setLoading(false);
        // callback from hook call
        if (callback) callback(response.data);
      })

      .catch((err) => {
        console.log(err)
		  // setMessage({
        //   isErrorMessage: true,
        //   showUserMessage: true,
        //   message: err.response.data.message,
        // });
        setLoading(false);
      });
  };
  // add  message, setMessage, back to export
  return { loading, setLoading, sendRequest };
}

export default useHttp;

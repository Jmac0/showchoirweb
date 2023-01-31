import { baseURL } from '../../../lib/urls';
import axios from 'axios';
import useHttp from '../useHttp';
import MockAdapter from 'axios-mock-adapter';
import { renderHook, act } from '@testing-library/react-hooks/dom';

const mock = new MockAdapter(axios);
describe('useHttp hook', () => {
  it('should make a POST request to the API and return a success message', async () => {
    // mock axios response
    mock.onPost(`${baseURL}/api/mailchimpAddProspect`).reply(200, {
      userMessage: 'Success message',
      status: 200,
    });

    // call the hook with the desired configuration
    const requestConfig = {
      url: 'api/mailchimpAddProspect',
      method: 'POST',
      withCredentials: false,
    };
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttp(requestConfig),
    );

    await act(async () => {
      // make the API call
      result.current.sendRequest();
    });
    waitForNextUpdate();
    //console.log(result.current.message.data.userMessage);

    // assert on the hook state
    expect(result.current.message).toBe('Success message');
    expect(result.current.loading).toBeTruthy;
    expect(result.current.sendRequest).toHaveBeenCalled;
    expect(result.current.isErrorMessage).toBe(false);
  });

  it('Should make a post request and return a request Failed message', async () => {
    // mock axios response

    mock.onPost(`${baseURL}/api/mailchimpAddProspect`).reply(400, {
      userMessage: 'Failed request',
      status: 400,
    });

    // call the hook with the desired configuration
    const requestConfig = {
      url: 'api/mailchimpAddProspect',
      method: 'POST',
      withCredentials: false,
    };
    const { result, waitForNextUpdate } = renderHook(() =>
      useHttp(requestConfig),
    );

    await act(async () => {
      // make the API call
      await result.current.sendRequest();
    });
    waitForNextUpdate();
    // assert on the hook state
    expect(result.current.loading).toBe(true);
    expect(result.current.message).toBe('Failed request');
    expect(result.current.isErrorMessage).toBe(true);
  });
});

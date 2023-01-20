import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faXmarkCircle,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

type Props = {
  message: string;
  isError: boolean;
  showMessage: boolean;
};
//TODO set opacity for showMessage
export function UserMessage({ message, isError, showMessage }: Props) {
  return (
    <div
      className={`flex flex-row mt-2 justify-evenly items-center w-max p-1 h-8 px-5 rounded-md border-2  
	  ${showMessage ? 'opacity-1' : 'opacity-0'}
  ${
    isError
      ? 'bg-red-400 border-red-900 text-red-900 '
      : 'bg-yellow-200 border-amber-600 text-amber-600 '
  }transition duration-200 ease-in-out`}
    >
      <div className="mr-3 mt-1">
        <FontAwesomeIcon
          icon={isError ? faXmarkCircle : faCircleCheck}
          style={{ fontSize: 20, color: isError ? '#b71c1c' : '#ffa000' }}
        />{' '}
      </div>
      <div>{message}</div>
    </div>
  );
}

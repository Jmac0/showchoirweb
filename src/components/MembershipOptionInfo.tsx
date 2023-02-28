import React from 'react';
import ReactMarkdown from 'react-markdown';
import { NavigateButton } from './NavigateButton/NavigateButton';

type Props = {
  markdown: string;
  navigateTo: string;
};

export const MembershipOptionInfo = ({ markdown, navigateTo }: Props) => {
  return (
    <div
      className="flex w-11/12 md:h-full  m-2 flex-col rounded-md border-2 border-lightGold  p-2
	  pl-5 text-gray-50 md:w-2/3  lg:w-1/3 "
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>
      <div className="mt-2.5">
        <NavigateButton text={'Join Now'} navigateTo={navigateTo} />
      </div>
    </div>
  );
};

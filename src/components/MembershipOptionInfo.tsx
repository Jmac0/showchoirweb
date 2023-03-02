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
      className="flex w-11/12 min-h-[700px] m-2 justify-evenly flex-col rounded-md border-2 border-lightGold  p-2
	  pl-5 text-gray-50 md:w-2/3  lg:w-1/3  md:items-center"
    >
      <ReactMarkdown>{markdown}</ReactMarkdown>

      <NavigateButton text={'Join Now'} navigateTo={navigateTo} />
    </div>
  );
};

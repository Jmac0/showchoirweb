import React from 'react';
import ReactMarkdown from 'react-markdown';
import { PillButton } from './../components/PillButton';

type Props = {
  markdown: string;
};

export const MembershipOptionInfo = ({ markdown }: Props) => {
  return (
    <div className="MembershipOptionsInfo flex flex-col flex-wrap rounded-md w-9/12 h-max text-center mx-7 px-6 pb-6 border-lightBlack border-2 bg-gradient-to-b from-lightGold to-amber-200  md:w-max mb-14">

<ReactMarkdown>{markdown}</ReactMarkdown>
      <div className="flex self-center mt-auto">
        <PillButton text={'Buy Now'} />
      </div>
    </div>
  );
};

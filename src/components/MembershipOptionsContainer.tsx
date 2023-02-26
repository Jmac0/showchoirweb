import React from 'react';
import { MembershipOptionInfo } from './MembershipOptionInfo';

type Props = {
  flexiInfo: string;
  monthlyInfo: string;
};
function MembershipOptionsContainer({ flexiInfo, monthlyInfo }: Props) {
  return (
    <div className="flex flex-col flex-wrap w-screen items-center justify-center md:h-3/4 md:flex-row">
      <MembershipOptionInfo markdown={flexiInfo} />
      <MembershipOptionInfo markdown={monthlyInfo} />
    </div>
  );
}

export default MembershipOptionsContainer;

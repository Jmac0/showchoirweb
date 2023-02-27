import React from 'react';
import { MembershipOptionInfo } from './MembershipOptionInfo';

type Props = {
  flexiInfo: string;
  monthlyInfo: string;
};
function MembershipOptionsContainer({ flexiInfo, monthlyInfo }: Props) {
  return (
    <div className="flex flex-col flex-wrap w-screen items-center justify-center md:flex-row">
      <MembershipOptionInfo
        markdown={monthlyInfo}
        navigateTo={'membership/monthly'}
      />
      <MembershipOptionInfo markdown={flexiInfo} navigateTo={'*'} />
    </div>
  );
}

export default MembershipOptionsContainer;

import React, { FC } from "react";
type Props = {
text: string;
}
export const PillButton: FC<Props> = ({text}) => {

return(
<button className='bg-gold  rounded-full px-4 py-1'>{text}</button>

)
	}

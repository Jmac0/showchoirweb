import React from "react";

type Props = {
  content: string;
};

export default function Slug({ content }: Props) {
  return <div className={`text-white-100`}>{content}</div>;
}

export async function getServerSideProps() {
  /*
	 await client
	 .getEntries()
	 .then((res: any) => {
	 data.content = res.items[0].fields.content.content[0].content[0].value;
	 res.items.map((el: { fields: { slug: string } }) => {
	 console.log("--------------");
	 console.log(el.fields.slug);
	 });
	 })
	 .catch((err: any) => {
	 console.log(err);
	 });
	 */
  return {
    props: {},
  };
}

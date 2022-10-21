import React from "react";
import {getPageData} from "../lib/getPages";

type Props = {
	content: {};
	title: string;
	slug: string

};

export default function Slug({title, content, slug}: Props) {
	return <div className={`text-violet-900`}>{title}</div>;
}

export async function getStaticPaths() {
	const res = await getPageData();
	const {items} = res;
	const slugs = items.map((item: { fields: { slug: string } }) => {
		return item.fields.slug;
	});
	const paths = slugs.map((s: { slug: any }) => ({params: {slug: s}}));
	return {
		paths,
		fallback: true,
	};
}

type Paths = {
	params: { slug: string };
};

export async function getStaticProps({params}: Paths) {
	const res = await getPageData();
	const {items} = res;
	const match = items.find(
		(item: any) => item.fields.slug === params.slug);
	const props = match.fields;
	return {
		props,
	};
}

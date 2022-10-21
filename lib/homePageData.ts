import {client} from "../contentfulClient";

export const getHomepageData = async () => {
	let data: any = {};
	await client
		.getEntry("5k8FguTtFbYMC6wGTLmhle")
		.then((res: any) => (data = res))
		.catch((err: any) => {
			console.log(err);
		});
	return data;
};

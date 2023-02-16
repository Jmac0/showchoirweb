import { client } from "../../contentfulClient";

export const getHomePageData = async () => {
  let data: any = {};
  await client
    .getEntry("5k8FguTtFbYMC6wGTLmhle")
    .then((res: any) => (data = res))
    .catch((err: any) => {
      console.log(err);
    });
  return data;
};
export const getPageData = async () => {
  let data: any = {};
  await client
    .getEntries({
      content_type: "page",
      "sys.id[ne]": "5k8FguTtFbYMC6wGTLmhle",
    })
    .then((res: any) => (data = res))
    .catch((err: any) => {
      console.log(err);
    });
  return data;
};

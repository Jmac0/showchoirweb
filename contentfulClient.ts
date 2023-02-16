const contentful = require("contentful");

export const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACEID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACESS_TOKEN,
});

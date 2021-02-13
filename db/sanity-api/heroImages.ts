import client, { previewClient } from "../sanity";

const getClient = (preview) => (preview ? previewClient : client);
const imageFields = `
title,
'slug': slug.current,
'image': image.asset->url,
name,
body
`;
export async function getAllImages(preview) {
  const result = await getClient(preview).fetch(`*[_type == "home_page_hero"]{
      ${imageFields}
  }`);
  return result;
}

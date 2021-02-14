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

export async function getAboutText(preview) {
  const result = await getClient(preview).fetch(`*[_type == "aboutUs"]{
    text
  }`);
  return result[0];
}
export async function getAchievement(preview) {
  const result = await getClient(preview)
    .fetch(`*[_type == "home_page_achievements"]{
    title,
    name,
    number,
  'image': image.asset->url,
  }`);
  return result;
}
export async function getbanner(preview) {
  const result = await getClient(preview).fetch(`*[_type == "banners"]{
    title,
    'image': image.asset->url,
  }`);
  return result;
}
export async function getvision(preview) {
  const result = await getClient(preview).fetch(`*[_type == "edcVision"]{
    text
  }`);
  return result[0];
}
export async function getNews(preview) {
  const result = await getClient(preview).fetch(`*[_type == "news"]{
    title,
    description,
    date,
    'image': news_image.asset->url,  
  }`);
  return result;
}
export async function getPartners(preview) {
  const result = await getClient(preview).fetch(`*[_type == "partners"]{
    name,
    'image': logo.asset->url,  
  }`);
  return result;
}

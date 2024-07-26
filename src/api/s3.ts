import axios from 'axios';
import { GAMEDEX_URL } from './gamedex';

async function getSignedRequest(file) {
  const fileName = encodeURIComponent(file.name);
  // hit our own server to get a signed s3 url
  const response = await axios.get(`${GAMEDEX_URL}/sign-s3?file-name=${fileName}&file-type=${file.type}`);
  return response;
}

// upload file directly to S3
// note how we return the passed in url here rather than any return value
// since we already know what the url will be - just not that it has been uploaded
async function uploadFileToS3(signedRequest, file, url) {
  await axios.put(signedRequest, file, { headers: { 'Content-Type': file.type } });
  return url;
}

export default async function uploadImage(file) {
  // returns a promise so you can handle error and completion in your component
  const response = await getSignedRequest(file);
  console.log(response);
  return uploadFileToS3(response.data.signedRequest, file, response.data.url);
}

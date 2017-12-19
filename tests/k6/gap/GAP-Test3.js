//Basic URL POST Test -> Unautenticated 
import http from "k6/http";
const ACCESSTOKEN = '';

export default function () {
  var url = "https://deployment-url.com";
  var payload = {
    title: 'Test Album',
    description: 'Test Album'
  };
  var params = {
    headers: {
      Authorization: `Bearer ${ACCESSTOKEN}`,
    },
  };
  http.post(url, payload, params);
};
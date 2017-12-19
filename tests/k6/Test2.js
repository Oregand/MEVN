//Basic URL POST Test -> Unautenticated 
import http from "k6/http";

export default function () {
  var url = "https://deployment-url.com";
  var payload = {
    title: 'Test Album',
    description: 'Test Album'
  };
  var params = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  http.post(url, payload, params);
};

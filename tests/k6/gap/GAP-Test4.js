//Basic URL POST Test -> Unautenticated 
import http from "k6/http";
import { sleep } from "k6";
const ACCESSTOKEN = '';

// Test run configuration
export let options = {
  // ramp up from 0 to 300 VUs during 100 seconds
  stages: [
    { duration: "100s", target: 300 }
  ],

  // set loadimpact k6 test name
  ext: {
    loadimpact: {
      name: 'Multi Album POST GAP Test Case'
    }
  }
};

// Test run scenario
export default function() {
  var url = "https://deployment-url.com";
  var payload = {
    title: Math.random().toString(36).substring(7),
    description: Math.random().toString(36).substring(7)
  };
  var params = {
    headers: {
      Authorization: `Bearer ${ACCESSTOKEN}`,
    },
  };
  http.post(url, payload, params);
};
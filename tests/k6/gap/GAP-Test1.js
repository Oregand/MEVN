//Basic URL GET Test
import http from "k6/http";
import { sleep } from "k6";

// Test run configuration
export let options = {
  // ramp up from 0 to 10 VUs during 60 seconds
  stages: [
    { duration: "30s", target: 10 }
  ],

  // set loadimpact k6 test name
  ext: {
    loadimpact: {
      name: 'First GAP Test Case'
    }
  }
};

// Test run scenario
export default function() {
  http.get('https://deployment-url.com');
  sleep(1);
};
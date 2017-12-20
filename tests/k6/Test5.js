// import some needed functionality
import http from "k6/http";
import { group, check } from "k6";

// Set some options for the test, and pass/fail thresholds
export let options = {
   vus: 10,
   duration: "5s",
   thresholds: {
      "http_req_duration{url:https://deployment-url.com}": [ "p(50)<100", "p(99)<150" ],
      "group_duration{group:::user scenario 1::page1}": [ "avg<500" ],
      "checks": [ "rate>0.95" ]
   }
};

// “main” function that the VUs will execute repeatedly during the test
export default function() {
   // Separate virtual user actions using groups
   group("user scenario 1", function() {
      group("page1", function() {
         check(http.get("https://deployment-url.com"), {
            "status is 200": (r) => r.status === 200,
            "body size is 1176 bytes": (r) => r.body.length === 1176
         });
         check(http.get("https://deployment-url.com/nonexistent"), {
            "status is 404": (r) => r.status === 404,
            "body size is 162 bytes": (r) => r.body.length === 162
         });
      });
      group("page2", function() {
         check(http.get("https://deployment-url.com/albums/new"), {
            "status is 200": (r) => r.status === 200,
            "body size is 12793 bytes": (r) => r.body.length === 12793
         });
         check(http.get("https://deployment-url.com/albums/new"), {
            "status is 200": (r) => r.status === 200,
            "body size is 231 bytes": (r) => r.body.length === 231
         });
      });
   });
};
import http from "k6/http";
import { check } from "k6";

// Load Test Option
export const options = {
  vus: 5,
  duration: "5s",
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<200"], // 95% of requests should be below 200ms
  },
};

export default function () {
  const url = "https://reqres.in/api/login";

  // Body Request
  const payload = JSON.stringify({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  });

  // Params
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Assertion Body Response, Status Code
  const res = http.post(url, payload, params);
  check(res, {
    "Verify status 200": (r) => r.status === 200,
    "Verify username": (r) => r.body.includes("token", "QpwL5tke4Pnpja7X4"),
  });
}

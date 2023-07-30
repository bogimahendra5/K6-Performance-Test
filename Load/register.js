import http from "k6/http";
import { check } from "k6";

// Load Test Option
export const options = {
  vus: 5,
  duration: "5s",
};

export default function () {
  const url = "https://reqres.in/api/register";

  // Body Request
  const payload = JSON.stringify({
    email: "eve.holt@reqres.in",
    password: "pistol",
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
    "Verify token": (r) =>
      r.body.includes(("id", "4"), ("token", "QpwL5tke4Pnpja7X4")),
  });
}

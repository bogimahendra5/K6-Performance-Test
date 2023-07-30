import http from "k6/http";
import { check } from "k6";

// Load Test Option
export const options = {
  vus: 5,
  duration: "5s",
};

export default function () {
  const url = "https://reqres.in/api/users/2";

  // Body Request
  const payload = JSON.stringify({
    name: "Bogibot",
    job: "CTO",
  });

  // Parse Data Body
  const valueData = JSON.parse(payload);

  // Params
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Assertion Body Response, Status Code
  const res = http.put(url, payload, params);
  check(res, {
    "Verify status 201": (r) => r.status === 200,
    "Verify Body Response": (r) =>
      r.body.includes(
        ("name", valueData.name),
        ("job", valueData.job),
        ("updateDate", Date())
      ),
  });
}

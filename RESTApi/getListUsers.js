import http from "k6/http";
import { check } from "k6";

// Load Test Option
export const options = {
  vus: 5,
  duration: "5s",
};

export default function () {
  const url = "https://reqres.in/api/users/";

  // Assertion Body Response, Status Code
  const res = http.get(url);
  check(res, {
    "Verify status 200": (r) => r.status === 200,
    "Verify response Body": (r) =>
      r.body.includes(
        ("id", "1"),
        ("email", "george.bluth@reqres.in"),
        ("first_name", "George"),
        ("last_name", "Bluth"),
        ("avatar", "https://reqres.in/img/faces/1-image.jpg")
      ),
  });
}

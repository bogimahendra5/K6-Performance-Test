import http from "k6/http";
import { check } from "k6";

// Run insertTodos.js before run this Load Test for inserting data

// Load test option
export const options = {
  vus: 1,
  duration: "1s",
  thresholds: {
    http_req_failed: ["rate<0.01"], // http errors should be less than 1%
    http_req_duration: ["p(95)<200"], // 95% of requests should be below 200ms
  },
};

// Quary mutation Insert Todos
const query = `
  mutation {
    delete_todos(where: {title: {_eq:"AutomationTest"}}) {
      returning {
        id
        title
      }
    }
  }`;

// Headers
const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDY0NTUzZmJjMWM1ODE0MTFkODUwZWY0ZiJ9LCJuaWNrbmFtZSI6ImJvZ2ltYWhlbmRyYTI3IiwibmFtZSI6ImJvZ2ltYWhlbmRyYTI3QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9jOWIwYmVjNjk3Yzc1MmIwMDhkMTZkZWEyNzkzZTM2MT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmJvLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIzLTA4LTEyVDE2OjM0OjE1LjQ3M1oiLCJpc3MiOiJodHRwczovL2dyYXBocWwtdHV0b3JpYWxzLmF1dGgwLmNvbS8iLCJhdWQiOiJQMzhxbkZvMWxGQVFKcnprdW4tLXdFenFsalZOR2NXVyIsImlhdCI6MTY5MTkxMTUzMiwiZXhwIjoxNjkxOTQ3NTMyLCJzdWIiOiJhdXRoMHw2NDU1M2ZiYzFjNTgxNDExZDg1MGVmNGYiLCJhdF9oYXNoIjoiRnBLNWV6M2I4dmNmd1hPbk10QlM1dyIsInNpZCI6InQ3aUtteE5NbGs5LWk2bzR5NU9nVVo3ZlN1d0ZZNnFDIiwibm9uY2UiOiJDaH5lM3ZKZWREeU9oUXNrcnRlVWRabGIuNHo2S2RaMiJ9.Nk7UrjP0a3cftKEoc2Uw12RMOxC8PLmVOUPyi_7uhk_z3YhLz0rdHVglHCTYuySxFgoxu_OAH4-EiXFaKr_0cgApHSc_k7thRUJGj3jtj6ajjn2YqplX9lda7seVgbCjnD_9JVO6iyRY-IVF-nf09R7JI3nt4ojWy94Ahc3zt3UL28qWiOfYOq6FYj6W1XUb5bjyEGhGARAFPfAa_OK_dZBPnro5BBvodN0LG4eCRBGT66F48Ac109QfuS4UUfjyd-CQHOG7xncLmyPiFXiCoGucfj1DhRsHikbs0I5FO7JCD-v4Qc7sxt7TKxMV8OwKE5x_yGpOTgLkZ7Y2OftXkA",
};

export default function () {
  let res = http.post(
    "https://hasura.io/learn/graphql",
    JSON.stringify({
      query,
    }),
    { headers }
  );

  // Verify / Assertion response
  check(res, {
    "is status code 200": (r) => r.status === 200,
    "Verify response body": (r) => r.body.includes("title", "AutomationTest"),
  });

  console.log(res.body);
}

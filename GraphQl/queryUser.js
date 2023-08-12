import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 5,
  duration: "5s",
};

const query = `
    query($limit : Int!){
        users(limit: $limit) {
            id
            name
    }}`;

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik9FWTJSVGM1UlVOR05qSXhSRUV5TURJNFFUWXdNekZETWtReU1EQXdSVUV4UVVRM05EazFNQSJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLWRlZmF1bHQtcm9sZSI6InVzZXIiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtdXNlci1pZCI6ImF1dGgwfDY0NTUzZmJjMWM1ODE0MTFkODUwZWY0ZiJ9LCJuaWNrbmFtZSI6ImJvZ2ltYWhlbmRyYTI3IiwibmFtZSI6ImJvZ2ltYWhlbmRyYTI3QGdtYWlsLmNvbSIsInBpY3R1cmUiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9jOWIwYmVjNjk3Yzc1MmIwMDhkMTZkZWEyNzkzZTM2MT9zPTQ4MCZyPXBnJmQ9aHR0cHMlM0ElMkYlMkZjZG4uYXV0aDAuY29tJTJGYXZhdGFycyUyRmJvLnBuZyIsInVwZGF0ZWRfYXQiOiIyMDIzLTA4LTEyVDE2OjM0OjE1LjQ3M1oiLCJpc3MiOiJodHRwczovL2dyYXBocWwtdHV0b3JpYWxzLmF1dGgwLmNvbS8iLCJhdWQiOiJQMzhxbkZvMWxGQVFKcnprdW4tLXdFenFsalZOR2NXVyIsImlhdCI6MTY5MTg1ODA1NiwiZXhwIjoxNjkxODk0MDU2LCJzdWIiOiJhdXRoMHw2NDU1M2ZiYzFjNTgxNDExZDg1MGVmNGYiLCJhdF9oYXNoIjoiRVhaVlpUNWpvd0VoaV9jUDhfNlB2dyIsInNpZCI6InQ3aUtteE5NbGs5LWk2bzR5NU9nVVo3ZlN1d0ZZNnFDIiwibm9uY2UiOiJNUVRiUTk5N1NlVUY5ZEVvVllKTThGeHN6QVFLdVNtYSJ9.n_ZTzny-T1Z3ul6SpfUMcP48SitKPunSGtn9x0i9V4n7eW8YnW71_m7TMkJDSg-TIaOcRWT2A7bInHgJmK-IfmSky5pSe4OEZ1cN_PcwzhXX-TzaR9yHBYE1O9mAjtsLBDAVwUkR75we5Q7m3m7V4wlq8jGFP1qOdc9yc6-0hVotalwRbMYbCDHHHDnt3MUmfCrhz6tJCC_2nNFHU2q_kvQCmPNr60qNu7bGfpPjbRor0-NKKFbNbzLOBb16W2KQugqg9d07-Y4s8qANaPaw7-98bOBaSG3ZW9R5560X756iaUi0X4IkxzJMRzsn3TUEYYkFT3r2W6JtVMO86MXu5g",
};

export default function () {
  let res = http.post(
    "https://hasura.io/learn/graphql",
    JSON.stringify({
      query,
      variables: { limit: 5 },
    }),
    { headers }
  );

  check(res, {
    "is status code 200": (r) => r.status === 200,
    "Verify response body": (r) =>
      r.body.includes(
        "id",
        "auth0|5cc0ea100e618b11b031bb99",
        "name",
        "tui.glen"
      ),
  });
}

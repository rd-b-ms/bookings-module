import http from 'k6/http';
import { check, sleep } from 'k6';
/* eslint-disable func-names */
// eslint-disable-next-line func-names

// model realistic behavior:

export const options = {
  vus: 10,
  duration: '60s',
  rps: 1000,
};

// TEST /GET REQUESTS:
export default function () {
  const res = http.get(`http://localhost:3003/?listingid=${Math.round(Math.random() * 10000000)}`);
  check(res, {
    success: r => r.status === 200,
  });
}

// TEST /POST REQUESTS:
// export default function () {
//   const url = `http://localhost:3003/?listingid=${Math.round(Math.random() * 10000000)}`;
//   const payload = JSON.stringify({
//     fromDate: '2020-01-08T08:00:00.000Z',
//     toDate: '2020-01-09T08:00:00.000Z',
//     numGuests: 1,
//     numInfants: 1,
//   });
//   const params = { headers: { 'Content-Type': 'application/json' } };
//   http.post(url, payload, params);
// }

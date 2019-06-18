import http from 'k6/http';
import { check, sleep } from 'k6';
/* eslint-disable func-names */
// eslint-disable-next-line func-names

export const options = {
  vus: 825,
  duration: '300s',
};

// TEST /GET REQUESTS:
export default function () {
  const res = http.get(`http://localhost:3003/booking?listingid=${Math.round(Math.random() * 10000000)}`);
  check(res, {
    success: r => r.status == 200,
  });
  sleep(1);
}

// TEST /POST REQUESTS:
// export default function () {
//   const url = 'http://localhost:3003/booking';
  // const payload = JSON.stringify({
  //   listingId: Math.round(Math.random() * 10000000),
  //   fromDate: '2020-01-08T08:00:00.000Z',
  //   toDate: '2020-01-09T08:00:00.000Z',
  //   numGuests: 1,
  //   numInfants: 1,
  // });
//   const params = { headers: { 'Content-Type': 'application/json' } };
//   http.post(url, payload, params);
// }

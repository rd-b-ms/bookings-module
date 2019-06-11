/* eslint-disable func-names */
// eslint-disable-next-line func-names
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '10s',
};

// export default function () {
//   const res = http.get('http://localhost:3003/?listingid=5');
//   check(res, {
//     success: r => r.status === 200,
//   });
// }

export default function () {
  const res = http.get(`http://localhost:3003/?listingid=${Math.round(Math.random() * 100000)}`);
  check(res, {
    success: r => r.status === 200,
  });
}

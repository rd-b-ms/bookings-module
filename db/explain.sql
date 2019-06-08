-- INNER JOIN / ON DATES / FROM 'BOOKINGS' TO 'LISTINGS' / EXPLAIN:

-- EXPLAIN ANALYZE SELECT bookings.from_date,bookings.to_date FROM bookings INNER JOIN listings ON bookings.listing_id=listings.listing_id WHERE bookings.listing_id=9100000;

-- INSERT INTO BOOKINGS

-- EXPLAIN ANALYZE INSERT INTO bookings(listing_id,from_date,to_date,num_guests,num_infants) VALUES (1,'2019-10-31T18:14:33.792Z','2019-12-30T04:03:36.740Z',2,5)

--INSERT INTO LISTINGS:

EXPLAIN ANALYZE SELECT bookings.from_date,bookings.to_date FROM bookings INNER JOIN listings ON bookings.listing_id=listings.listing_id WHERE bookings.listing_id=3000000;

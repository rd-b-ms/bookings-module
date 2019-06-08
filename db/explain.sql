-- INNER JOIN / ON DATES / FROM 'BOOKINGS' TO 'LISTINGS' / EXPLAIN:

EXPLAIN ANALYZE SELECT bookings.from_date,bookings.to_date FROM bookings INNER JOIN listings ON bookings.listing_id=listings.listing_id WHERE bookings.listing_id=9100000;

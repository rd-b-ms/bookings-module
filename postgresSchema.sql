DROP DATABASE IF EXISTS booking_portal

CREATE DATABASE booking_portal

\connect booking_portal

CREATE TABLE bookings 
  (booking_id SERIAL PRIMARY KEY, 
  listing_id INTEGER REFERENCES listings(listing_id), 
  from_date TIMESTAMP NOT NULL, 
  to_date TIMESTAMP NOT NULL, 
  num_guests INT NOT NULL, 
  num_infants INT NOT NULL);

CREATE TABLE listings 
  (listing_id SERIAL PRIMARY KEY, 
  price INT NOT NULL, 
  num_reviews INT NOT NULL, 
  avg_rating_pct INT NOT NULL, 
  max_guests INT NOT NULL);

COPY bookings(listing_id,from_date,to_date,num_guests,num_infants) FROM '/Users/martinconnor/Desktop/booking-portal-module/db/bookings_data.csv' DELIMITERS ',' CSV;
COPY listings(price,num_reviews,avg_rating_pct,max_guests) FROM '/Users/martinconnor/Desktop/booking-portal-module/db/listings_data.csv' DELIMITERS ',' CSV;
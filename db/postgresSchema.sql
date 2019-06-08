DROP DATABASE IF EXISTS bookings_portals;

CREATE DATABASE bookings_portals;

\c bookings_portals;

CREATE TABLE listings 
  (listing_id SERIAL PRIMARY KEY, 
  price INT NOT NULL, 
  num_reviews INT NOT NULL, 
  avg_rating_pct INT NOT NULL, 
  max_guests INT NOT NULL);

CREATE TABLE bookings 
  (booking_id SERIAL PRIMARY KEY, 
  listing_id INT NOT NULL REFERENCES listings(listing_id), 
  from_date TIMESTAMP WITH TIME ZONE NOT NULL, 
  to_date TIMESTAMP WITH TIME ZONE NOT NULL, 
  num_guests INT NOT NULL, 
  num_infants INT NOT NULL);

COPY listings(price,num_reviews,avg_rating_pct,max_guests) FROM '/Users/martinconnor/Desktop/bookings-module/db/listings_data.csv' DELIMITERS ',' CSV HEADER;

COPY bookings(listing_id, from_date,to_date,num_guests,num_infants) FROM '/Users/martinconnor/Desktop/bookings-module/db/bookings_data.csv' DELIMITERS ',' CSV HEADER;
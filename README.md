# photodisplay-module
Repository for a mock of the Airbnb booking portal component.

## Stack
**Front-End**: React.js<br />
**Server**: Express<br />
**Database**: MySQL<br />

## Instructions for Setting Up Environment
1. Install dependencies with `npm install`
2. Ensure you have nodemon installed globally on your machine. If not, `npm install nodemon --save-dev`.
3. Change authentication of mysql connection in sequelize.js file
4. Create mysql database `booking_portal`
5. Seed database with fake data by running `node db/fake_data.js`
6. Bundle code with webpack by running `npm run build`
7. Run server with `npm start`

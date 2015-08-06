# passport-backend
Backend for client: https://github.com/gadabout/passport

# External dependencies
Mongodb. Installation guide: http://docs.mongodb.org/manual/installation/

# Current State: 
A server with following REST endpoints:
* POST /api/boats (functional, minor issue pending: cross site from browser.)
* GET /api/boats  (functional, minor issue pending: cross site from browser.)
* POST /api/listings (somewhat, need to translate timestamp sent to date.)
* GET /api/listings  (somewhat, returns all the listings, need to filter by date.)

# Running instructions:
1. Go to project dir, do: *npm install* 
2. Then do:  *node server.js*
3. Server starts at port 3000

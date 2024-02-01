# Junior Fullstack technical test (BACKEND)

This is the backend repo of my test. On this repo I did some things to show my skills:

* I connected my backend with my MongoDB database
* I started a development server
* I configured AWS Cognito to manage authentication
* I created a REST API to deal with tasks and users of my app
* I made the models of my database
* I created two routes to manage my requests. One is /api which allow me to control requests to my REST API. And the another one is /auth which allow me to sign up, confirmate and login an user
* Also, I added a middleware to add an authentication token on requests. So if someone is not registered, it could not make requests
* I made unit tests with jest and supertest to verify my CRUD operations work fine


## .Env values

* PORT=8000 (Development mode)
* MONGO_URI=

AMAZON WEB SERVICES DATA
* ACCESS=
* ACCESS_SECRET=
* USER_POOL_ID=
* CLIENT_ID=
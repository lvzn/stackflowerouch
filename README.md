# stackflowerouch
A forum site where user can post code snippets. Course project. MERN.

# Features
- login/register with password hashing and salting
- authentication with jsonwebtoken
- voting: only one vote per user
- users are able to
    - read code posts by other users
    - read comments posted to code snippets
    - post code snippets if logged in
    - post comments to code snipppets if logged in
    - vote code snippets if logged in
- and of course
    - login
    - register

# Technologies
The app is implemented using the MERN stack, meaning the database is implemented using MongoDB and Mongoose, Express as the backend framework, React as the frontend framework and NodeJS as the base for the backend.


Using React wasn't mandatory for this project, but I chose to use it anyway as it seemed like a good choice and I wanted to learn more about it during the course of making this project.


In addition, Material UI was used in the frontend to help with making things responsive. 

# Prerequisites

- MongoDB installation
- .env file in the server folder with the following values defined:
    - NODE_ENV = "development" (or run the server setting the environment variable to development)
    - SECRET set to whatever you wish
    - DB_URL set to (mongodb usually runs in port 27017), for example "mongodb://localhost:27017/db"


# Installation

To install the required packages run

> npm install

in the root of the project. This will install the requirements of both the frontend and the backend.

To run the backend use 

>npm run dev:server

and then run the frontend using

>npm run dev:client

The backend will run in port 1234 and the frontend in 3000

# Client

Without logging in one can view the posts and comments, but can't create new posts, comments or vote. To use these functionalities you have to register and then log in.

# Points proposition

All mandatory requirements have been done +25p

According to the requirements, password salting and hashing wasn't mandatory, so looking to gain +1-2p

React has been used in implementing the system +5p

Voting has been implemented, though it's more of a like feature, but it's similar in essence +3p


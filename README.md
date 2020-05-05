# Facebook Clone
#### A basic Facebook chat  page to demonstrate and practice my full stack skills (client, server, and database).

# Tools Utilized:
#### Front-end
* HTML/CSS/JavaScript
* CSS Skeleton
   * https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css
* NPM's **live-server** package
* JavaScript's **Document Object Model**

#### Back-end
* Server
   * **NodeJS** and **ExpressJS**
   * Middleware **morgan** to logging incoming requests in order to debug
   * **Cors**
   * **Nodemon** to run server
* database
   * **MongoDB** (No SQL)
   * **Mongoose** for connection
   * **Mocha** for testing purposes

# How to run the app:
#### Make sure you have you have all the necessary packages and frameworks from the back-end and front-end sections installed. Also make sure you have mongodb service is running and have 2 command-line windows opened to run the client and server separately.

1. Go to client folder
   * run `npm start` on 1st command-line window
2. Go to server folder
   * run `npm run dev` on 2nd command-line window
3. To run testing:
   * Go to server folder
   * then run `npm test`

# Features:
#### Search
* Can search for posts by date and time, name, or any text that are contained within a post.

#### Timeline
* Contains all the messages within the chat room.

#### Links
* UCF website Link
   * https://www.ucf.edu/
* GitHub Repository link
* LinkedIn Profile link
   * https://linkedin.com/in/stefan-werleman

#### New Post Form
* Create a post with a facebook handle

# Deployment

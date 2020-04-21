const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./models/Post.js");

const app = express();
app.use(cors());

// Any JSON will be parsed
app.use(express.json());

// Connect to database
mongoose.connect("mongodb://localhost/facebookClone",
{
   useNewUrlParser: true,
   useUnifiedTopology: true
});

// Verify connection
mongoose.connection.once("open", function()
{
   // Successful Connection
   console.log("Connected to Database");
}).on("error", function(error)
{
   // Unsuccessful Connection
   console.log("Connection error:", error);
});

// GET Request:
app.get("/posts", function(req, res)
{
   // Sends all posts to client

});


// Form validation
function isValidPost(post)
{
   // Checks if there is a handle
   if (post.name && post.name.toString().trim() === "")
      return false;

   // Checks if a message exist
   if (post.message && post.message.toString().trim() === "")
      return false;

   return true;
}

// Post request for new posts
app.post("/post", function(req, res)
{
   if (isValidPost(req.body))
   {
      var newpost = new Post(
      {
         handle: req.body.handle.toString(),
         message: req.body.message.toString(),
         date: req.body.date.toString()
      });

      // Save into DB
      newpost.save().then(function(err, doc)
      {
         console.log(newpost.isNew);
      });

      // Ok status
      res.json({ status: 200 });
   }
   else
   {
      // Unprocessable Entity
      res.status(422);
      res.json(
      {
         message: "Invalid Inputs"
      });
   }
});

app.listen(5000, function()
{
   console.log("Listening on http://localhost:5000");
});

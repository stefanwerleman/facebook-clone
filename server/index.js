const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./models/Post.js");
const Filter = require("bad-words");

// Filter out any profanity
const filter = new Filter();

// Port
const PORT = 5000;

const app = express();
app.use(cors());

// Any JSON will be parsed
app.use(express.json());

// Connect to database
mongoose.connect("mongodb+srv://stefanwerleman:<password>@facebook-clone-b4egb.mongodb.net/test?retryWrites=true&w=majority",
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

// Clearing all posts everday at midnight
app.delete("/clear", function(req, res)
{
   Post.deleteMany({}, function(err, result)
   {
      if (err)
      {
         res.json({ status: 500, message: "Failed to clear chat" });
      }
      else
      {
         res.json({ status: 200, message: "Success" });
      }
   });
});

// Get all current posts once the browser loads
app.get("/posts", function(req, res)
{
   // Sends all posts to client
   Post.find({}, function(err, posts)
   {
      if (err)
      {
         res.json({ status: 500, message: "Failed to get all posts" })
      }
      else
      {
         // Sending all posts to client
         res.json(posts);
      }
   });
});

// Flag if handle contains any profanity.
var isProfane;

// Form validation
function isValidPost(post)
{
   isProfane = filter.isProfane(post.handle.toString().trim());

   if (isProfane)
      return false;

   // Checks if there is a handle
   if (post.handle && post.handle.toString().trim() === "")
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
      const data = req.body;
      var newpost = new Post(data);

      // Save into DB
      newpost.save(function(err, doc)
      {
         if (err)
         {
            res.json({ status: 500, error: "(Internal Server Error)" });
         }
         else
         {
            res.json(
            {
               status: 200,
               message: "Successfully Submitted",
               post: filter.clean(newpost.message.toString().trim())
            });
         }
      });
   }
   else
   {
      if (isProfane)
      {
         // Not acceptable
         res.json(
         {
            status: 406,
            error: "Handle Contains Profanity"
         });
      }
      else
      {
         // Unprocessable Entity
         res.json(
         {
            status: 422,
            error: "Invalid Inputs"
         });
      }
   }
});

app.listen(PORT, function()
{
   console.log("Listening on http://localhost:5000");
});

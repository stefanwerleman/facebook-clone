const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Any JSON will be parsed
app.use(express.json());

// This will be a dummy file with JSON obects
// TODO: Once database is set up, extract from db
const data = require("./FakeData/Posts.js");
const posts = data.posts;


// GET Request:
app.get("/posts", function(req, res)
{
   // Sends all posts to client
   res.json(posts);
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
      var newpost =
      {
         handle: req.body.handle.toString(),
         message: req.body.message.toString(),
         date: req.body.date.toString()
      }

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

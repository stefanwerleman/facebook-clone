const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Any JSON will be parsed
app.use(express.json());

// This will be a dummy file with JSON obects
// const posts = require("");

// GET Request:
app.get("/posts", function(req, res)
{
   var post =
   {
      handle: "@stefan",
      message: "hello 😝",
      date: new Date()
   }

   // Client receives this
   res.json(post);

   // TODO: Should load all posts
   // TODO: Do it in streams for efficiency
   // res.json(
   // {
   //    handle: "@stefanwerleman",
   //    message: "This is a dummy post 😝",
   //    date: new Date()
   // });
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

      console.log(newpost);
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

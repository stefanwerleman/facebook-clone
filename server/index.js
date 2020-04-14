const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// GET Request:
app.get("/", function(req, res)
{
   // TODO: Should load all posts
   // TODO: Do it in streams for efficiency

   res.json(
   {
      handle: "@stefanwerleman",
      message: "This is a dummy post 😝",
      date: new Date()
   });
});

// Post request for new posts
app.post("/post", function(req, res)
{
   console.log(res.body);
});

app.listen(5000, function()
{
   console.log("Listening on http://localhost:5000");
});

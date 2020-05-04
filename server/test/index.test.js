const mocha = require("mocha");
const assert = require("assert");
const Post = require("../models/Post.js");

describe("All Database Operations", function()
{
   it("Saves a post to the database", function(done)
   {
      var newpost =
      {
         handle: "@testhandle",
         message: "test message",
         data: new Date()
      };

      var post = new Post(newpost);

      post.save(function(err, doc)
      {
         assert(post.isNew === false);
         // if (err)
         // {
         //    res.json({ status: 500, error: "(Internal Server Error)" });
         // }
         // else
         // {
         //    res.json(
         //    {
         //       status: 200,
         //       message: "Successfully Submitted",
         //       post: filter.clean(newpost.message.toString().trim())
         //    });
         // }
         done();
      });
   });
});

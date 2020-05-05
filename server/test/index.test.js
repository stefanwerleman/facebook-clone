const mocha = require("mocha");
const assert = require("assert");
const Post = require("../models/Post.js");

// Insertions
describe("All Database Insertion Operations", function()
{
   it("Saves 1st post to the database", function(done)
   {
      var newpost =
      {
         handle: "@testhandle1",
         message: "test message #1",
         data: new Date()
      };

      var post = new Post(newpost);

      post.save(function(err, doc)
      {
         assert(post.isNew === false);
      });

      done();
   });

   it("Saves 2nd post to the database", function(done)
   {
      var newpost =
      {
         handle: "@testhandle2",
         message: "test message #2",
         data: new Date()
      };

      var post = new Post(newpost);

      post.save(function(err, doc)
      {
         assert(post.isNew === false);
      });

      done();
   });

   it("Saves 3rd post to the database", function(done)
   {
      var newpost =
      {
         handle: "@testhandle3",
         message: "test message #3",
         data: new Date().toString()
      };

      var post = new Post(newpost);

      post.save(function(err, doc)
      {
         assert(post.isNew === false);
      });

      done();
   });
});

// Find all records
describe("Database Find Operation", function()
{
   it("Retrieves all Records from Database", function(done)
   {
      var n = 0;

      // Grabs the current number of records
      Post.count({}, function(err, cnt)
      {
         n = cnt;
      });

      Post.find({}, function(err, posts)
      {
         assert.equals(posts.length(), n);
      });

      done();
   });
});

// Delete a Records Operation
describe("Database Deletion Operation", function()
{
   it("Deletes all Records from Database", function(done)
   {
      var n = 0;

      // Grabs the current number of records
      Post.count({}, function(err, cnt)
      {
         n = cnt;
      });

      // Checks if it has deleted n records.
      Post.deleteMany({}, function(err, result)
      {
         assert.equals(result.deletedCount, n);
      });

      done();
   });
});

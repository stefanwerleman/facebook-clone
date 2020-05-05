// Expiration time is midnight
const expiration = new Date();
expiration.setHours("24");
expiration.setMinutes("00");
expiration.setSeconds("00");

// Form Handling
const newPostForm = document.forms["newpost-form"];

// API URL
const API_URL = "http://localhost:5000";

// When the page initially loads up
getAllPosts();

// The chat will clear everyday at midnight
var timer = setInterval(function()
{
   // Current date
   var now = new Date();

   updateTimer(now);

   // Checking if it's time to clear the chat (Midnight)
   if ((now.getHours() === expiration.getHours()) &&
       (now.getMinutes() === expiration.getMinutes()) &&
       (now.getSeconds() === expiration.getSeconds()))
   {
      clearChat();
   }
}, 1000);

// Getting time tags
const hours = document.querySelector("#hours");
const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

// calculates how much time is left
function updateTimer(now)
{
   var h = 23 - now.getHours();
   var m = 59 - now.getMinutes();
   var s = 59 - now.getSeconds();

   // Include leading zeros to time if necessary
   hours.textContent = (h < 10) ? ('0' + h.toString()) : h.toString();
   minutes.textContent = (m < 10) ? ('0' + m.toString()) : m.toString();
   seconds.textContent = (s < 10) ? ('0' + s.toString()) : s.toString();
}

function clearChat()
{
   fetch(API_URL + "/clear", { method: "DELETE" })
   .then(response => response.json())
   .then(function(response)
   {
      if (response.status !== 200)
      {
         console.log("Could not clear chat");
         return;
      }
      else
      {
         // Refreshes page to demontrate removal of all posts
         location.reload();
      }
   });
}

newPostForm.addEventListener("submit", function(event)
{
   event.preventDefault();

   // Gather values from child nodes
   var handle = newPostForm.querySelector("#handle").value;
   var message = newPostForm.querySelector("#message").value;

   if (handle[0] != '@')
   {
      var prefix = '@';
      prefix += handle;
      handle = prefix;
   }

   // New post object
   var newpost =
   {
      handle: handle,
      message: message,
      date: new Date()
   };

   // POST Request to /post route
   fetch(API_URL + "/post",
   {
      method: "POST",
      body: JSON.stringify(newpost),
      headers:
      {
         "content-type": "application/json"
      }
   })
   .then(function(response)
   {
      return response.json();
   })
   .then(function(response)
   {
      if (response.status !== 200)
      {
         // Internal server
         if (response.status === 500)
         {
            console.error(response.error);
         }
         else if (response.status === 422)
         {
            // Unprocessable Entity
            console.error(response.error);
         }
         else if (response.status === 406)
         {
            // Profanity
            alert("Handle cannot have any bad words");
            console.error(response.error);
         }

         return;
      }
      else
      {
         console.log(response.message);

         // This could return post with filtered profanity
         newpost.message = response.post;

         addPost(newpost);
         newPostForm.reset();
      }
   });
});

// Gets all the post when page loads up.
function getAllPosts()
{
   fetch(API_URL + "/posts")
      .then(response => response.json())
      .then(function(posts)
      {
         posts.forEach(function(post)
         {
            addPost(post);
         });
      });
}

// Create New post
function addPost(newpost)
{
   // Creating new post
   var newli = document.createElement("li");
   newli.classList.add("post-container");

   // Constructing Post elements
   var newspan = document.createElement("span");
   var handle = document.createElement("label");
   handle.setAttribute("id", "user");
   handle.textContent = newpost.handle;

   // Setting up date and time
   // Ex) Mar 21 at 1:21 PM
   var date = document.createElement("p");
   date.setAttribute("id", "date");
   date.classList.add("date-time");

   var months = ["Jan", "Feb", "Mar", "Apr",
                 "May", "Jun", "Jul", "Aug",
                 "Sep", "Oct", "Nov", "Dec"];

   var postDate = new Date(newpost.date);

   var time = months[postDate.getMonth()];
   time += " ";
   time += postDate.getDate().toLocaleString();
   time += " at ";
   time += postDate.toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'});

   date.textContent = time;

   // Setting up message element
   var message = document.createElement("p");
   message.setAttribute("id", "message");
   message.classList.add("post-content");
   message.textContent = newpost.message;

   newspan.appendChild(handle);
   newspan.appendChild(date);

   newli.appendChild(newspan);
   newli.appendChild(message);

   // Getting timeline list
   var timeline = document.querySelector("#timeline-container");

   // Adding new element to the DOM
   timeline.prepend(newli);
}

// Search filter
const searchFilter = document.querySelector("#search");

searchFilter.addEventListener("keyup", function(e)
{
   var term = e.target.value.toLowerCase();
   var posts = document.querySelectorAll(".post-container");

   posts.forEach(function(post)
   {
      // Getting contents you want to search for
      var user = post.querySelector("#user");
      var date = post.querySelector("#date");
      var message = post.querySelector("#message");

      // Display if it matches search key
      if (user.textContent.toLowerCase().indexOf(term) != -1 ||
          date.textContent.toLowerCase().indexOf(term) != -1 ||
          message.textContent.toLowerCase().indexOf(term) != -1)
      {
         post.style.display = "block";
      }
      else
      {
         post.style.display = "none";
      }
   });
});

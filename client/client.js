// Form Handling
const newPostForm = document.forms["newpost-form"];

newPostForm.addEventListener("submit", function(event)
{
   event.preventDefault();

   // Gather values from child nodes
   var handle = newPostForm.querySelector("#handle").value;
   var message = newPostForm.querySelector("#message").value;

   // New post object
   var newpost =
   {
      handle: handle,
      message: message,
      date: new Date()
   };

   // POST Request

   addPost(newpost);
});

// Create New post
function addPost(newpost)
{
   // Creating new post
   var newli = document.createElement("li");
   newli.classList.add("post-container");

   var newspan = document.createElement("span");
   var handle = document.createElement("label");
   handle.textContent = newpost.handle;

   var date = document.createElement("p");
   date.classList.add("date-time");
   date.textContent = newpost.date;

   var message = document.createElement("p");
   message.classList.add("post-content");
   message.textContent = newpost.message;

   newspan.appendChild(handle);
   newspan.appendChild(date);

   newli.appendChild(newspan);
   newli.appendChild(message);

   // Getting timeline list
   var timeline = document.querySelector("#timeline-container");

   // Adding new element
   timeline.appendChild(newli);
}

// Search filter
const searchFilter = document.querySelector("#search");

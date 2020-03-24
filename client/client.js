// Form Handling
const newPostForm = document.forms["newpost-form"];

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

   // Setting up date and time
   var date = document.createElement("p");
   date.classList.add("date-time");

   var months = ["Jan", "Feb", "Mar", "Apr",
                 "May", "Jun", "Jul", "Aug",
                 "Sep", "Oct", "Nov", "Dec"];


   var time = months[newpost.date.getMonth()];
   time += " ";
   time += newpost.date.getDate().toLocaleString();
   time += " at ";
   time += newpost.date.toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit'});

   date.textContent = time;

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

// post method
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const content = document.querySelector('textarea[name="content"]').value;

   // Get the post title and post text from the form
   const title = document.querySelector('input[name="post-title"]').value;
   const post_text = document.querySelector('textarea[name="post-text"]').value;

   // use the add a new post POST route to add the post 
   // user id is added from the session information in the route
   const response = await fetch(`/api/posts`, {
     method: 'POST',
     body: JSON.stringify({
       title,
       post_text
     }),
     headers: {
       'Content-Type': 'application/json'
     }
   });

   // if the response is okay, reload the page, showing the newest post now in the user's post list
   if (response.ok) {
     document.location.replace('/dashboard');
     // otherwise, display the error
   } else {
     alert(response.statusText);
   }
 }

//   put method
async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('textarea[name="content"]').value.trim();
  console.log(title);
  console.log(content);

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id,
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }

}

// delete method
async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      post_id: id
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }

}
if (document.querySelector('#new-post-form')) {
  document.querySelector('#new-post-form').addEventListener('submit', newFormHandler
  )
};
if (document.querySelector('.edit-post-form')) {
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler
  )
};
if (document.querySelector('.delete-post-btn')) {
  document.querySelector.addEventListener('click', deleteFormHandler
  )
};
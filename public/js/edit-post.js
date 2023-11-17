//gets the post id from the endpoint
const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
];

//allows post to be updated
const updatePostFormHandler = async (event ) => {
    event.preventDefault();

    const title = document.querySelector("#title-update-post").value.trim();
    const content = document.querySelector("content-update-post").value.trim();

    if (title && content) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: "PUT",
            body: JSON.stringify({title, content}),
            headers: { "Content-Type": "application/json"},
        });

        if (response.ok) {
            document.location.replace("/dashboard");
        }else {
            alert("failed to update post.");
        }
    }


};
const deletePostFormHandler = async (event) => {
    event.preventDefault();
  
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "DELETE",
    });
  
    if (response.ok) {
      document.location.replace("/dashboard"); 
    } else {
      alert("Failed to delete a post."); 
    }
  };
//this is for the event listeners
const updatePostButton = document.querySelector("#update-post");

if (updatePostButton) {
    updatePostButton.addEventListener("click", updatePostFormHandler);
}

const deletePostButton = document.querySelector("#delete-post");
if  (deletePostButton) {
    deletePostButton.addEventListener("click", deletePostFormHandler)
}
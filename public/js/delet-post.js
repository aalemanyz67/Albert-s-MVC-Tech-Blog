//javaScript to delet a post
const deletePost = async (post_id) => {
    const response = await fetch(`/api/post/${post_id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    });

    if (response.ok) {
        document.location.reload(); //this reloads the page
    }else {
        alert("Cannot delet the post.");

    }
};

const deletPostHandler = (event) => {
    if(event.target.matches("delete-post")) {
        const post_id = event.target.getAttribute("data-post-id");
        deletePost(post_id);
    }
};

document.addEventListener("click", deletPostHandler);
import React, { useState } from "react";

const CommentForm = ({ post , sendPost}) => {
  const [commentText, setCommentText] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/posts/comment/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentText }),
      });
    const result = await response.json()
    // console.log(result);
    sendPost(result)
      if (response.ok) {
        console.log("Comment posted successfully!");
      } else {
        console.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="">
        <div className="card-body">
          <h5 className="card-title">Leave a Comment</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="commentText" className="form-label">
                Your Comment
              </label>
              <textarea
                className="form-control"
                id="commentText"
                rows="4"
                value={commentText}
                placeholder="Write your comment here..."
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;

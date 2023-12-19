import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { dateFormat } from "../components/Post";
import { FaPen, FaTrash } from "react-icons/fa";
import CommentForm from "../components/CommentForm";
export default function Post() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState('');

  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/feeds/${params.postId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [params.postId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const setUpdatedPost = (post) => {
    console.log(post);
    setPost(post)
  };

  const handleRemoveComment = (id) => {
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData), 
      });
      
      if (response.ok) {
        const updatedPost = await response.json();
        
        setMessage(updatedPost.message)
        setTimeout(() => {
          setMessage(''); 
        }, 2000);
        setPost(updatedPost.updatedPost);
        
      } else {
        console.error('Failed to update post:', response.statusText);
      }
    } catch (error) {

      console.error('Error while updating post:', error);
    }
  
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Post deleted successfully");
        navigate("/");
      } else {
        console.error("Failed to delete post:", response.statusText);
      }
    } catch (error) {
      console.error("Error while deleting post:", error);
    }
  };

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {post && !loading && !error && (
        <main className="container py-5">
          <div
            className="p-4 p-md-5 mb-4 rounded text-black"
            style={{
              backgroundImage: `url(${post?.picturePath})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              position: "relative",
            }}
          >
            <div
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                borderRadius: "inherit",
               }}
            ></div>
            <div
              className="col-lg-6 px-0 position-relative"
              style={{ zIndex: 1 }}
            >
              <h1 className="display-4 fst-italic">{post?.title}</h1>
              <p className="lead my-3">{post?.description.substring(0,200)}</p>
              <p className="lead mb-0">
                <a href="#" className="text-body-emphasis fw-bold">
                  Continue reading...
                </a>
              </p>
            </div>
          </div>

          <div className="row g-5">
            <div className="col-md-8">
              <div className="border-bottom d-flex justify-content-between align-items-center pb-3">
                <h3 className="fst-italic">Posted By : {post?.postedBy}</h3>
                {post.userId === currentUser?._id && currentUser ? (
                  <div className="d-flex gap-3">
                    <button
                      onClick={() => setEdit(!edit)}
                      className="btn btn-light rounded align-items-center fw-bold d-flex gap-3"
                    >
                      Edit
                      <span>
                        <FaPen />
                      </span>
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn btn-danger rounded align-items-center fw-bold d-flex gap-3"
                    >
                      Delete
                      <span>
                        <FaTrash />
                      </span>
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {edit ? (
                <form onSubmit={handleSubmit} className="row gap-3 m-auto py-5">
                {message && <div className="alert alert-success">{message}</div>}
                  <div className="col-md-12 gap-3 d-flex flex-column m-auto">
                    <label htmlFor="title  " className="fw-bold">
                      {" "}
                      Title :
                    </label>
                    <input
                      type="text"
                      placeholder="Title"
                      className="form-control rounded"
                      id="title"
                      maxLength="62"
                      minLength="5"
                      required
                      onChange={handleChange}
                      defaultValue={post.title}
                    />
                    <label htmlFor="description " className="fw-bold">
                      {" "}
                      Description :
                    </label>
                    <textarea
                      type="text"
                      placeholder="Description"
                      className="form-control rounded"
                      id="description"
                      rows={10}
                      cols={10}
                      required
                      onChange={handleChange}
                      defaultValue={post.description}
                    />
                    <button className="btn btn-primary ">Update</button>
                  </div>
                </form>
              ) : (
                <article className="blog-post">
                  <h2 className="display-5 link-body-emphasis mb-1">
                    {post?.title}
                  </h2>
                  <p className="blog-post-meta">
                    {dateFormat(post?.createdAt)} <a href="#">Mark</a>
                  </p>

                  <p>{post?.description}</p>
                  <hr />
                </article>
              )}
            </div>

            <div className="col-md-4">
              <div className="position-sticky" style={{ top: "2rem" }}>
                <div className="p-4 mb-3 bg-body-tertiary rounded">
                  <h4 className="fst-italic">About</h4>
                  <p className="mb-0">
                    Customize this section to tell your visitors a little bit
                    about your publication, writers, content, or something else
                    entirely. Totally up to you.
                  </p>
                </div>

                <div>
                  <h4 className="fst-italic">Comments</h4>

                  <div
                    className=""
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                  >
                    {post?.comments?.map((comment, index) => {
                      return (
                        <div
                          className="card mb-3"
                          key={new Date().getTime() + index}
                        >
                          <div className="card-body">
                            <div className="d-flex flex-start">
                              <img
                                className="rounded-circle shadow-1-strong me-3"
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                                alt="avatar"
                                width="40"
                                height="40"
                              />
                              <div className="w-100">
                                <div className="d-flex flex-column align-items-start mb-3">
                                  <h6 className="text-primary fw-bold mb-0">
                                    {comment?.user}
                                  </h6>
                                  <p className="text-dark">
                                    {comment.commentText}
                                  </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                  <p
                                    className="small mb-0"
                                    style={{ color: "#aaa" }}
                                  >
                                    <button
                                      onClick={() => handleRemoveComment(index)}
                                      className="link-grey btn btn-secondry"
                                    >
                                      Remove
                                    </button>{" "}
                                    •
                                    <a href="#!" className="link-grey">
                                      Reply
                                    </a>{" "}
                                    •
                                    <a href="#!" className="link-grey">
                                      Translate
                                    </a>
                                  </p>
                                  <div className="d-flex flex-row">
                                    <i className="fas fa-star text-warning me-2"></i>
                                    <i
                                      className="far fa-check-circle"
                                      style={{ color: "#aaa" }}
                                    ></i>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {currentUser?._id !== post.userId && currentUser && (
                    <CommentForm post={post} sendPost={setUpdatedPost} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </main>
  );
}

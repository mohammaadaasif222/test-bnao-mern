import React, { useState, useEffect, lazy, Suspense } from "react";
import { MdLocationPin } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { PiWarningCircleThin } from "react-icons/pi";
import { fetchPosts, selectAllPosts } from "../redux/post/postsSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Post = lazy(() => import("./Post"));

const Content = () => {
  const dispactch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const { currentUser } = useSelector((state) => state.user);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    dispactch(fetchPosts());
  }, [liked]);

  return (
    <div className="px-md-0 px-sm-0 container pt-3">
      <div
        className="row px-lg-5 px-md-0 px-sm-0"
        style={{ flexWrap: "wrap-reverse" }}
      >
        <div className="col-md-8 p-0">
          {posts?.map((post) => (
            <Suspense fallback={<p>Loading...</p>}  key={post.title}>
              <Post
                post={post}
                reloadState={() => setLiked(!liked)}
              />
            </Suspense>
          ))}
        </div>
        {currentUser ? (
          <div className="col-md-3" style={{ marginLeft: "auto" }}>
            <div className="card p-3">
              <div className="d-flex align-items-center  gap-3 flex-column">
                <div className="image">
                  <img
                    src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                    className="rounded"
                    width="155"
                  />
                </div>

                <div className="ml-3 w-100">
                  <h4 className="mb-0 mt-0 text-capitalize">
                    {currentUser?.userName}
                  </h4>
                  <span>{currentUser?.email}</span>

                  <div className="button mt-2 d-flex flex-row  gap-3 align-items-center">
                    <button className="btn btn-sm btn-outline-primary w-100">
                      Chat
                    </button>
                    <Link
                      className="btn btn-sm btn-primary w-100 ml-2"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="col-md-3 p-3 my-md-3 my-sm-3"
            style={{ marginLeft: "auto" }}
          >
            <div className="d-flex justify-content-between">
              <div className="d-flex gap-2 align-items-center">
                <span>
                  <MdLocationPin />
                </span>
                <span>Noida, India</span>
              </div>
              <div>
                <FaPen />
              </div>
            </div>
            <hr />
            <p
              className="p-3 mt-3 d-flex gap-2"
              style={{ fontSize: "x-small", color: "#76727275" }}
            >
              <span>
                <PiWarningCircleThin />
              </span>
              <span className="">
                Your location will help us serve better and extend a
                personalised experience.
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;

import React from "react";
import { FaEye, FaThumbsUp } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaPenFancy } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";

export const dateFormat = (dateString) => {
  const date = new Date(dateString);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayOfWeek = days[date.getUTCDay()];
  const dayOfMonth = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;
  return formattedDate;
};

const Post = ({ post , reloadState}) => {
const {currentUser} = useSelector((state)=> state.user)
  const liked = post?.likes?.some((like)=>like.userId === currentUser?._id)
  const handleLike = async () => {
    if(!currentUser){
      alert('Plase login first')
    }
    try {
      const response = await fetch(`/api/posts/like/${post._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (response.ok) {
        const result = await response.json();
         reloadState()
        console.log("Liked posted successfully!");
      } else {
        console.error("Failed to post Likes");
      }
    } catch (error) {
      console.error("Error posting like:", error);
    }
  };
  const handleOpenOptions =()=>{
  }
  return (
    <div className="card mb-3 border">
      <img
        className="card-img-top"
        src={post?.picturePath}
        style={{ height: "220px" }}
      />
      <div className="card-body">
        <h6 className="fw-bold text-muted d-flex gap-3 py-3">
          <span>
            <FaPenFancy />
          </span>{" "}
          Story{" "}
        </h6>
        <h5 className="card-title d-flex justify-content-between">
          {post?.title}
          <span className="btn btn-light d-flex align-items-center px-3">
            <HiDotsHorizontal onClick={handleOpenOptions} />
          </span>
        </h5>
        <p className="card-text text-muted">{post?.description.substring(0,200)}</p>
        <p className="card-text">
          <Link to={`/post/${post?._id}`}>Read More</Link>
        </p>
        <p className="card-text"></p>
      </div>
      <div className="card-body">
        <div className="d-flex flex-start">
          <img
            className="rounded-circle shadow-1-strong me-3"
            src={`https://res.cloudinary.com/mae-com-in/image/upload/v1699458800/images_bx6zzs.png`}
            alt="avatar"
            width="40"
            height="40"
          />
          <div className="w-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">{post?.postedBy}</h6>
              <p
                className="mb-0 text-muted d-flex align-items-center gap-3 fw-bold"
                style={{ fontSize: "small" }}
              >
                <span>
                  <FaThumbsUp onClick={handleLike} style={{ color: liked ? 'blue' : '', fontSize: '20px', cursor:'pointer' }} />
                </span>
                {post?.likes.length} likes
                <button className="btn btn-light rounded d-flex justify-content-center align-items-center px-3">
                  <IoShareSocialSharp />
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

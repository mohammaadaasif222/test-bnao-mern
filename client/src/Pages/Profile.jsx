import React,{useState, useEffect} from "react";

import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";
const Profile = () => {
const [posts, setPosts] = useState(null)
const {currentUser} = useSelector((state)=> state.user)
const fetchUserPosts = async ()=>{
  try {
    const response = await fetch('/api/posts/user');
    const result = await response.json()
    setPosts(result)
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
useEffect(()=>{
  fetchUserPosts()
},[])
  return (
    <section id="content" className="container">
      <div className="page-heading">
        <div className="media clearfix bg-light p-3 my-3 rounded d-flex">
          <div className="media-left pr30">
            
              <img
                className="media-object mw150"
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                alt="..."
              />
           
          </div>
          <div className="media-body va-m pt-5">
            <h2 className="media-heading text-capitalize">
              {currentUser?.userName}
              <small> - Profile</small>
            </h2>
            <p className="lead">
              Lorem ipsum dolor sit amet ctetur adicing elit, sed do eiusmod
              tempor incididunt
            </p>
            <div className="media-links">
              <ul className="list-inline list-unstyled">
                <li>
                  <a href="#" title="facebook link">
                    <span className="fa fa-facebook-square fs35 text-primary"></span>
                  </a>
                </li>
                <li>
                  <a href="#" title="twitter link">
                    <span className="fa fa-twitter-square fs35 text-info"></span>
                  </a>
                </li>
                <li>
                  <a href="#" title="google plus link">
                    <span className="fa fa-google-plus-square fs35 text-danger"></span>
                  </a>
                </li>
                <li className="hidden">
                  <a href="#" title="behance link">
                    <span className="fa fa-behance-square fs35 text-primary"></span>
                  </a>
                </li>
                <li className="hidden">
                  <a href="#" title="pinterest link">
                    <span className="fa fa-pinterest-square fs35 text-danger-light"></span>
                  </a>
                </li>
                <li className="hidden">
                  <a href="#" title="linkedin link">
                    <span className="fa fa-linkedin-square fs35 text-info"></span>
                  </a>
                </li>
                <li className="hidden">
                  <a href="#" title="github link">
                    <span className="fa fa-github-square fs35 text-dark"></span>
                  </a>
                </li>
                <li className="">
                  <a href="#" title="phone link">
                    <span className="fa fa-phone-square fs35 text-system"></span>
                  </a>
                </li>
                <li>
                  <a href="#" title="email link">
                    <span className="fa fa-envelope-square fs35 text-muted"></span>
                  </a>
                </li>
                <li className="hidden">
                  <a href="#" title="external link">
                    <span className="fa fa-external-link-square fs35 text-muted"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="row m-auto mb-3">
         <div className="col-md-4 rounded bg-light ">
          <div className="content bg-light p-5">Hello</div>
         </div>
         <div className="bg-light rounded" style={{marginLeft:'auto', width:'65%'}}>
          <div className="content bg-light p-5">
            {posts ? "" : <p>No post yet <Link to='/create-post'>Create one</Link></p>}
          </div>
         </div>
      </div>
    </section>
  );
};

export default Profile;

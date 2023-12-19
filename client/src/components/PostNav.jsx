import React, { useEffect, useState } from "react";

import { MdGroupAdd } from "react-icons/md";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {selectAllPosts} from '../redux/post/postsSlice'
import {useSelector} from 'react-redux'

const PostNav = () => {
  const posts = useSelector(selectAllPosts)
  const [active, setActive] = useState(0);
  const navitem = [
    {
      name: `All Posts(${posts.length})`,
    },
    {
      name: "Article",
    },
    {
      name: "Event",
    },
    {
      name: "Education",
    },
    {
      name: "Job",
    },
  ];

  useEffect(() => {
    // Any side effects related to 'active' state can be placed here
    console.log(active);
  }, [active]);

  return (
    <div className="container pt-5 d-none d-md-block">
      <div className="row px-4">
        <div className="col-md-6 d-flex align-items-center">
          <ul className="d-flex gap-3 align-items-center list-unstyled p-0 m-0">
            {navitem.map((item, index) => (
              <li
                key={index}
                onClick={() => setActive(index)}
                style={{
                  color: active === index ? "black" : "#898989",
                  fontWeight: active === index ? "600" : "normal",
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6 d-flex justify-content-end gap-3">
          <button className="btn btn-light rounded fw-bold d-flex gap-3">
            <Link to="/create-post" className="d-flex gap-3">
              Write a Post{" "}
              <span>
                <IoChevronDownCircleOutline />
              </span>
            </Link>
          </button>
          <button className="btn btn-primary rounded  d-flex gap-2">
            <span>
              <MdGroupAdd />
            </span>
            Join Group
          </button>
        </div>
      </div>
      <hr style={{ width: "96%", marginLeft: "2%" }} />
    </div>
  );
};

export default PostNav;

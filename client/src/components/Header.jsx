import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { IoMdCloseCircle } from "react-icons/io";

import {
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,

} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const response = await fetch("/api/auth/logout");
      const result = await response.json();
      dispatch(signOutUserSuccess());
    } catch (error) {
      console.log(error);
      dispatch(signOutUserFailure());
    }
  };

  useEffect(() => {
    if (window.innerWidth >= 575) {
      setOpen(false);
    }
  }, [open]);
  return (
    <nav className="h-[72px] bg-white shadow p-2">
      <div className="container-fluid">
        <div className="row">
          <div className="col-4 d-flex d-none d-sm-flex  justify-content-start align-items-center">
            <Link className="navbar-brand" to="/">
              <img
                src="https://res.cloudinary.com/mae-com-in/image/upload/v1702485244/whole_yqjofe.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="col-4  d-none d-sm-flex d-flex justify-content-center align-items-center">
            <input
              type="text"
              placeholder="Search for your favorite groups in ATG"
              className="bg-zinc-100 rounded-pill px-3"
              style={{
                width: "90%",
                border: "none",
                background: "#F2F2F2",
                height: "42px",
                fontSize: "small",
              }}
            />
          </div>
          <div className="col-4 d-flex d-none d-sm-flex justify-content-end align-items-center">
            {currentUser ? (
              <button
                className="btn btn-secondry rounded d-flex gap-2 border align-items-center justify-content-center"
                onClick={handleLogout}
              >
                <PiSignOutBold/> <span>

                  Sign Out
                  </span>
              </button>
            ) : (
              <div className="text-right">
                <span className="text-secondary font-weight-medium">
                  Create account.{" "}
                </span>
                <Link to="/sign-up" className="cursor-pointer">
                  <span className="text-primary font-weight-bold">
                    It’s free!
                  </span>
                </Link>
              </div>
            )}
          </div>
          <div
            className="col-12 d-flex d-sm-none "
            style={{ justifyContent: "end" }}
          >
            <img
              src="https://res.cloudinary.com/mae-com-in/image/upload/v1702525957/Group_3_wy4ov3.svg"
              alt="icons"
              onClick={handleOpen}
            />
          </div>
          {open && (
            <div
              className="container-fluid mt-3"
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                width: "90%",
                height: "100vh",
              }}
            >
              <div className="container">
                <div className=" d-flex py-3  align-items-center justify-content-between">
                  <Link className="navbar-brand" to='/'>
                    <img
                      src="https://res.cloudinary.com/mae-com-in/image/upload/v1702485244/whole_yqjofe.png"
                      alt="logo"
                    />
                  </Link>
                  <button className="btn text-lg p-0" onClick={()=>setOpen(false)}><IoMdCloseCircle/></button>
                </div>
                <div className="d-flex  align-items-center py-3">
                  <input
                    type="text"
                    placeholder="Search for your favorite groups in ATG"
                    className="bg-zinc-100 rounded-pill px-3"
                    style={{
                      border: "none",
                      background: "#F2F2F2",
                      height: "42px",
                      fontSize: "small",
                    }}
                  />
                </div>
                <div className=" d-flex py-3 align-items-center">
                  {currentUser ? (
                    <button
                      className="btn btn-secondry rounded"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </button>
                  ) : (
                    <div className="text-right">
                      <span className="text-secondary font-weight-medium">
                        Create account.{" "}
                      </span>
                      <Link to="/sign-up" className="cursor-pointer">
                        <span className="text-primary font-weight-bold">
                          It’s free!
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

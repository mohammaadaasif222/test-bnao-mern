import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello ");
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };



  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked);
  };
  return (
    <div className="container p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-4 w-50 m-auto py-5"
      >
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded"
          id="username"
          onChange={handleChange}
        />
        <input
          type={showPassword ? "text": "password"}
          placeholder="Password"
          className="border p-3 rounded"
          id="password"
          onChange={handleChange}
        />
        <div className="form-check form-switch d-flex gap-3 align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckDefault"
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Show password
          </label>
        </div>

        <button disabled={loading} className="btn btn-primary btn-lg rounded">
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="d-flex col-8 m-auto align-items-center">
        <div className="m-auto d-flex gap-2">
          <p>Don't have an account?</p>
          <Link to={"/sign-up"}>
            <span className="text-primary">Sign up</span>
          </Link>
        </div>
        <div className="m-auto d-flex gap-2">
          <Link to={"/forgot"}>
            <span className="text-primary">forgot password ?</span>
          </Link>
        </div>
      </div>
      {error && (
        <p className="alert alert-danger text-center w-50 m-auto">{error}</p>
      )}
    </div>
  );
}

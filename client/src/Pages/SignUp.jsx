import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked);
  };
  return (
    <div className="container p-3">
    <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
    <form onSubmit={handleSubmit} className="d-flex flex-column w-50 m-auto py-5">
      <input
        type="text"
        placeholder="Username"
        className="border p-3 rounded mb-3"
        id="username"
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-3 rounded mb-3"
        id="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-3 rounded mb-3"
        id="password"
        onChange={handleChange}
      />
        <div className="form-check form-switch d-flex gap-3 align-items-center pb-3">
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
      <button
        disabled={loading}
        className="btn btn-primary btn-lg rounded"
      >
        {loading ? "Loading..." : "Sign Up"}
      </button>
    </form>
    <div className="d-flex">
        <div className="m-auto d-flex gap-2">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-primary">Sign In</span>
        </Link>
        </div>
      </div>
      {error && <p className="alert alert-danger text-center w-50 m-auto">{error}</p>}
  </div>
  );
}

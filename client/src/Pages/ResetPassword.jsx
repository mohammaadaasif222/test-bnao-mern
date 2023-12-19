import { useState } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import {  useSelector } from "react-redux";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({newPassword:'', token});
  const { loading, error } = useSelector((state) => state.user);
  const [message, setMessage] = useState()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setMessage(data.message)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 ">Reset password</h1>
      {message ? <div className="alert alert-success col-8 m-auto my-5">{message}</div>:
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column gap-4 w-50 m-auto py-5"
      >
        <input
          type="password"
          placeholder="Enter new password"
          className="border p-3 rounded"
          id="newPassword"
          onChange={handleChange}
        />

        <button disabled={loading} className="btn btn-primary btn-lg rounded">
          {loading ? "Loading..." : "Reset"}
        </button>
      </form>}
      {error && (
        <p className="alert alert-danger text-center w-50 m-auto">{error}</p>
      )}
    </div>
  );
}
